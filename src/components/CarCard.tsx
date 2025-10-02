import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Fuel, Gauge, Star } from "lucide-react";

interface CarCardProps {
  id: string;
  name: string;
  provider: string;
  image: string;
  price: number;
  rating: number;
  type: string;
  transmission: string;
  fuelType: string;
  seats: number;
}

const CarCard = ({ id, name, provider, image, price, rating, type, transmission, fuelType, seats }: CarCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-smooth group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <Badge className="absolute top-3 right-3 bg-background/90 backdrop-blur">
          {type}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{provider}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{seats}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{fuelType}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary">${price}</span>
          <span className="text-sm text-muted-foreground">/day</span>
        </div>
        <Link to={`/car/${id}`}>
          <Button variant="hero">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
