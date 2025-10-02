import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Car, Shield, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-car.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero car"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Rental Car
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Compare prices from top rental providers. Best deals, verified reviews, instant booking.
            </p>
            <div className="flex gap-4">
              <Button variant="hero" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 -mt-16 relative z-20 mb-16">
        <SearchBar />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose DriveHub?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The smartest way to rent a car, combining choice, value, and convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                <Car className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Wide Selection</h3>
              <p className="text-muted-foreground">
                Compare cars from multiple trusted rental companies in one place
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Best Prices</h3>
              <p className="text-muted-foreground">
                We guarantee competitive rates with transparent pricing and no hidden fees
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Instant Booking</h3>
              <p className="text-muted-foreground">
                Book in minutes with our streamlined checkout process
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full gradient-primary mx-auto flex items-center justify-center">
                <Award className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Verified Reviews</h3>
              <p className="text-muted-foreground">
                Read authentic reviews from real customers to make informed decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="gradient-primary rounded-3xl p-12 text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl mb-4">Ready to hit the road?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers who found their perfect rental car
            </p>
            <Button variant="accent" size="lg">
              Start Searching Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <Car className="h-6 w-6 text-primary" />
                <span>DriveHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted car rental aggregator, connecting you with the best deals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Providers</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>List Your Fleet</li>
                <li>Partner Portal</li>
                <li>Resources</li>
                <li>API Documentation</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 DriveHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
