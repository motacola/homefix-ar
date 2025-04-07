import { useEffect, useRef } from "react";

interface HeaderProps {
  userMenuOpen: boolean;
  toggleUserMenu: () => void;
}

export default function Header({ userMenuOpen, toggleUserMenu }: HeaderProps) {
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen, toggleUserMenu]);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button id="menu-toggle" className="mr-4 text-gray-700 lg:hidden">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <a href="#" className="flex items-center">
            <i className="fas fa-tools text-primary-500 text-2xl mr-2"></i>
            <h1 className="text-xl font-bold text-gray-800">HomeFix AR</h1>
          </a>
        </div>
        <div className="flex items-center">
          <button className="p-2 text-gray-700 hover:text-primary-600 relative">
            <i className="far fa-bell text-xl"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button 
            ref={userMenuButtonRef}
            onClick={toggleUserMenu}
            className="ml-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <i className="fas fa-user text-gray-500"></i>
          </button>
        </div>
      </div>
      {/* User dropdown menu */}
      <div 
        ref={userDropdownRef}
        className={`${userMenuOpen ? 'block' : 'hidden'} absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10`}>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Saved Repairs</a>
        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
        <div className="border-t border-gray-100"></div>
        <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign Out</a>
      </div>
    </header>
  );
}
