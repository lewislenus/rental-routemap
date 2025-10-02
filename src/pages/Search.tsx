import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("recommended");
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("available", true);

      if (error) throw error;
      setCars(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading cars",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const carTypes = ["Economy", "Compact", "Sedan", "SUV", "Luxury", "Electric", "Van"];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Gasoline", "Diesel", "Hybrid", "Electric"];

  const filteredCars = cars.filter(
    (car) => car.price_per_day >= priceRange[0] && car.price_per_day <= priceRange[1]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Available Cars</h1>
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `Found ${filteredCars.length} cars matching your search`}
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6">
            <div className="bg-card rounded-lg p-6 border space-y-6">
              <div className="flex items-center gap-2 font-semibold text-lg">
                <SlidersHorizontal className="h-5 w-5" />
                Filters
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base mb-4 block">Price Range</Label>
                  <Slider
                    min={0}
                    max={200}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full" onClick={() => setPriceRange([0, 200])}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Showing {filteredCars.length} results</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {loading ? (
                <p>Loading cars...</p>
              ) : filteredCars.length === 0 ? (
                <p>No cars available matching your criteria.</p>
              ) : (
                filteredCars.map((car) => (
                  <CarCard 
                    key={car.id}
                    id={car.id}
                    name={car.name}
                    image={car.image_url || "/placeholder.svg"}
                    price={Number(car.price_per_day)}
                    type={`${car.brand} ${car.model}`}
                    transmission={car.transmission}
                    fuelType={car.fuel_type}
                    seats={car.seats}
                    provider={car.location}
                    rating={4.5}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
