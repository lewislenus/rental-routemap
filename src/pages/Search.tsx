import { useState } from "react";
import Navigation from "@/components/Navigation";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCars } from "@/lib/mockData";
import { SlidersHorizontal } from "lucide-react";

const Search = () => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState("recommended");

  const carTypes = ["Economy", "Compact", "Sedan", "SUV", "Luxury", "Electric", "Van"];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Gasoline", "Diesel", "Hybrid", "Electric"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Available Cars</h1>
          <p className="text-muted-foreground">Found {mockCars.length} cars matching your search</p>
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

                <div>
                  <Label className="text-base mb-3 block">Car Type</Label>
                  <div className="space-y-2">
                    {carTypes.map((type) => (
                      <div key={type} className="flex items-center gap-2">
                        <Checkbox id={type} />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">Transmission</Label>
                  <div className="space-y-2">
                    {transmissions.map((trans) => (
                      <div key={trans} className="flex items-center gap-2">
                        <Checkbox id={trans} />
                        <label htmlFor={trans} className="text-sm cursor-pointer">
                          {trans}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base mb-3 block">Fuel Type</Label>
                  <div className="space-y-2">
                    {fuelTypes.map((fuel) => (
                      <div key={fuel} className="flex items-center gap-2">
                        <Checkbox id={fuel} />
                        <label htmlFor={fuel} className="text-sm cursor-pointer">
                          {fuel}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full">Reset Filters</Button>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">Showing all results</p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockCars.map((car) => (
                <CarCard key={car.id} {...car} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
