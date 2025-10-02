import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User, LayoutDashboard } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Car className="h-8 w-8 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              DriveHub
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/search">
              <Button variant="ghost" size="sm">
                Browse Cars
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                For Providers
              </Button>
            </Link>
            <Link to="/account">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
