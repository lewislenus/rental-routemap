import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Calendar, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select(`
          *,
          cars (
            name,
            brand,
            model,
            image_url
          )
        `)
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">My Account</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      {profile?.first_name} {profile?.last_name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span>{new Date(profile?.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total bookings</span>
                    <span>{bookings.length}</span>
                  </div>
                </div>

                <Button variant="ghost" className="w-full text-destructive" onClick={signOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-4">Start exploring and book your first car</p>
                    <Button variant="hero" onClick={() => navigate("/search")}>
                      Browse Cars
                    </Button>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{booking.cars?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {booking.cars?.brand} {booking.cars?.model}
                          </p>
                        </div>
                        <Badge variant={booking.status === "completed" ? "secondary" : "default"}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.pickup_location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(booking.pickup_date).toLocaleDateString()} to{" "}
                            {new Date(booking.dropoff_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">Total paid</span>
                          <p className="text-xl font-bold text-primary">${booking.total_price}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
