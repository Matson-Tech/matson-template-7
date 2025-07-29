import { useContext } from "react";
import { Link } from "react-router-dom";
import { WeddingContext } from "@/context/WeddingContext";
import { Button } from "@/components/ui/button";
import { Search, Instagram, LogOut, LogIn } from "lucide-react";

export default function Navigation() {
  const context = useContext(WeddingContext);

  if (!context) {
    throw new Error("Navigation must be used within WeddingProvider");
  }

  const { isLoggedIn, logout } = context;

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="w-full bg-blush-50/80 backdrop-blur-sm border-b border-blush-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="font-script text-2xl text-rose-600 font-semibold">
              Wedding
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="text-foreground hover:text-rose-600 transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-foreground hover:text-rose-600 transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
              >
                About
              </Link>
              <Link 
                to="/gallery" 
                className="text-foreground hover:text-rose-600 transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
              >
                Gallery
              </Link>
              <Link 
                to="/details" 
                className="text-foreground hover:text-rose-600 transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
              >
                Details
              </Link>
              <Link 
                to="/rsvp" 
                className="text-foreground hover:text-rose-600 transition-colors duration-200 font-medium text-sm tracking-wide uppercase"
              >
                RSVP
              </Link>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button className="text-foreground hover:text-rose-600 transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="text-foreground hover:text-rose-600 transition-colors duration-200">
              <Instagram className="h-5 w-5" />
            </button>

            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button asChild variant="ghost" size="sm" className="flex items-center gap-2">
                <Link to="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-foreground hover:text-rose-600 transition-colors duration-200">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
