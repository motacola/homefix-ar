interface BottomNavigationProps {
  onScan: () => void;
}

export default function BottomNavigation({ onScan }: BottomNavigationProps) {
  return (
    <nav className="bg-white border-t border-gray-200">
      <div className="container mx-auto">
        <div className="flex justify-around">
          <a href="#" className="flex flex-col items-center py-3 px-6 text-primary-600">
            <i className="fas fa-home text-xl mb-1"></i>
            <span className="text-xs">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center py-3 px-6 text-gray-500 hover:text-primary-600">
            <i className="fas fa-search text-xl mb-1"></i>
            <span className="text-xs">Explore</span>
          </a>
          <button 
            onClick={onScan}
            className="flex flex-col items-center py-3 px-6 text-gray-500 hover:text-primary-600">
            <i className="fas fa-camera text-xl mb-1"></i>
            <span className="text-xs">Scan</span>
          </button>
          <a href="#" className="flex flex-col items-center py-3 px-6 text-gray-500 hover:text-primary-600">
            <i className="fas fa-shopping-cart text-xl mb-1"></i>
            <span className="text-xs">Parts</span>
          </a>
          <a href="#" className="flex flex-col items-center py-3 px-6 text-gray-500 hover:text-primary-600">
            <i className="fas fa-user text-xl mb-1"></i>
            <span className="text-xs">Profile</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
