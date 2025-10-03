import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Users, Fuel, Gauge, Star, MapPin, Shield, CheckCircle2 } from "lucide-react";

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const { data, error } = await supabase
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (error: any) {
        toast({
          title: "Error loading car",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden">
              <img src={car.image_url} alt={car.name} className="w-full aspect-[16/9] object-cover" />
            </div>

            {/* Car Details */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{car.name}</h1>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {car.location}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-base">
                      {car.brand} {car.model}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <Star className="h-5 w-5 fill-accent text-accent" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-muted-foreground text-sm ml-1">(128 reviews)</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
                      <Users className="h-6 w-6 mb-2 text-primary" />
                      <span className="font-semibold">{car.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
                      <Gauge className="h-6 w-6 mb-2 text-primary" />
                      <span className="font-semibold">{car.transmission}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
                      <Fuel className="h-6 w-6 mb-2 text-primary" />
                      <span className="font-semibold">{car.fuel_type}</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-lg bg-secondary/50">
                      <Shield className="h-6 w-6 mb-2 text-primary" />
                      <span className="font-semibold">{car.luggage} Bags</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A {car.year} {car.brand} {car.model} with {car.seats} seats, {car.fuel_type} fuel type, and {car.transmission} transmission. Perfect for your journey.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Features & Amenities</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {car.features?.map((feature: string) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-2">
              <CardContent className="p-6 space-y-6">
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-primary">${car.price_per_day}</span>
                    <span className="text-muted-foreground">/day</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Best price guaranteed</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base rate (3 days)</span>
                    <span className="font-medium">${Number(car.price_per_day) * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-medium">$15/day</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees</span>
                    <span className="font-medium">$25</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-primary">${Number(car.price_per_day) * 3 + 15 * 3 + 25}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg" 
                  variant="hero"
                  onClick={() => navigate(`/booking/${car.id}`)}
                >
                  Book Now
                </Button>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Free cancellation up to 48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
