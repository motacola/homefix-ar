import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, User, Bell, Home, Search, Wrench, Cog, LogOut } from "lucide-react";

interface HeaderProps {
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
}

export default function Header({ userMenuOpen, toggleUserMenu }: HeaderProps) {
  const [location, navigate] = useLocation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Handle user dropdown menu clicks
      if (
        userDropdownRef.current && 
        userMenuButtonRef.current && 
        !userMenuButtonRef.current.contains(event.target as Node) && 
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        // Click is outside, close dropdown if open
        if (userMenuOpen) {
          toggleUserMenu();
        }
      }

      // Handle side menu clicks
      if (
        sideMenuRef.current &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node) &&
        !sideMenuRef.current.contains(event.target as Node)
      ) {
        // Click is outside, close side menu if open
        if (isSideMenuOpen) {
          setIsSideMenuOpen(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen, toggleUserMenu, isSideMenuOpen]);

  return (
    <header className="bg-white shadow-sm relative z-20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            ref={menuButtonRef}
            onClick={toggleSideMenu}
            aria-label="Toggle menu" 
            className="mr-4 text-gray-700 lg:hidden p-1 hover:bg-gray-100 rounded-md"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="flex items-center">
            <Wrench className="text-primary-500 h-6 w-6 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">HomeFix AR</h1>
          </Link>
        </div>
        <div className="flex items-center">
          <button className="p-2 text-gray-700 hover:text-primary-600 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            ref={userMenuButtonRef}
            onClick={toggleUserMenu}
            aria-label="User menu"
            className="ml-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Side menu (hamburger menu) */}
      <div 
        ref={sideMenuRef}
        className={`${isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wrench className="text-primary-500 h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">HomeFix AR</h2>
            </div>
            <button onClick={toggleSideMenu} className="text-gray-500 hover:text-gray-700">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <nav className="px-4 py-4">
          <ul>
            <li className="mb-2">
              <Link 
                href="/" 
                className={`flex items-center p-3 rounded-md ${location === '/' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={toggleSideMenu}
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link 
                href="/explore" 
                className={`flex items-center p-3 rounded-md ${location === '/explore' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={toggleSideMenu}
              >
                <Search className="h-5 w-5 mr-3" />
                <span>Explore</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link 
                href="/parts" 
                className={`flex items-center p-3 rounded-md ${location === '/parts' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={toggleSideMenu}
              >
                <Wrench className="h-5 w-5 mr-3" />
                <span>Parts</span>
              </Link>
            </li>
            <li className="mb-2">
              <Link 
                href="/profile" 
                className={`flex items-center p-3 rounded-md ${location === '/profile' ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={toggleSideMenu}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <button className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md">
              <Cog className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
            <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-md">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* User dropdown menu */}
      <div 
        ref={userDropdownRef}
        className={`${userMenuOpen ? 'block' : 'hidden'} absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10`}
      >
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Saved Repairs</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
        <div className="border-t border-gray-100"></div>
        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</a>
      </div>

      {/* Overlay when side menu is open */}
      {isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSideMenu}
        ></div>
      )}
    </header>
  );
}
