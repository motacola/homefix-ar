import { Link, useLocation } from "wouter";
import { Home, Search, Camera, ShoppingCart, User } from "lucide-react";

interface BottomNavigationProps {
  onScan: () => void;
}

export default function BottomNavigation({ onScan }: BottomNavigationProps) {
  const [location] = useLocation();

  // Determine active tab
  const isActive = (path: string) => {
    return location === path;
  };

  // Get active class for a nav item
  const getActiveClass = (path: string) => {
    return isActive(path) ? "text-primary-600" : "text-gray-500 hover:text-primary-600";
  };

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
      <div className="container mx-auto">
        <div className="flex justify-around">
          <Link href="/" className={`flex flex-col items-center py-3 px-6 ${getActiveClass("/")}`}>
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/explore" className={`flex flex-col items-center py-3 px-6 ${getActiveClass("/explore")}`}>
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">Explore</span>
          </Link>
          <button 
            onClick={onScan}
            className="flex flex-col items-center py-3 px-6 text-gray-500 hover:text-primary-600">
            <Camera className="w-5 h-5 mb-1" />
            <span className="text-xs">Scan</span>
          </button>
          <Link href="/parts" className={`flex flex-col items-center py-3 px-6 ${getActiveClass("/parts")}`}>
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs">Parts</span>
          </Link>
          <Link href="/profile" className={`flex flex-col items-center py-3 px-6 ${getActiveClass("/profile")}`}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
