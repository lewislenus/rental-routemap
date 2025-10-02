import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, DollarSign, Calendar, TrendingUp, Plus } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Fleet", value: "24", icon: Car, change: "+2 this month" },
    { title: "Revenue", value: "$12,450", icon: DollarSign, change: "+15% vs last month" },
    { title: "Active Bookings", value: "18", icon: Calendar, change: "6 pending pickup" },
    { title: "Avg. Rating", value: "4.8", icon: TrendingUp, change: "+0.2 this month" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Provider Dashboard</h1>
            <p className="text-muted-foreground">Manage your rental fleet and bookings</p>
          </div>
          <Link to="/admin/cars">
            <Button variant="hero" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Add New Car
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">Toyota Camry</p>
                      <p className="text-sm text-muted-foreground">John Doe • 3 days</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">$135</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Cars</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "BMW 3 Series", bookings: 42, revenue: "$3,990" },
                  { name: "Tesla Model 3", bookings: 38, revenue: "$3,230" },
                  { name: "Honda CR-V", bookings: 35, revenue: "$2,275" },
                ].map((car, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{car.name}</p>
                      <p className="text-sm text-muted-foreground">{car.bookings} bookings</p>
                    </div>
                    <p className="font-semibold text-primary">{car.revenue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
