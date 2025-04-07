import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { useAppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Parts() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { setShowARScanner } = useAppContext();
  
  const handleScan = () => {
    setShowARScanner(true);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // In a complete implementation, this would fetch parts from an API
  // For now, we'll use mock data
  const { data: parts, isLoading } = useQuery({
    queryKey: ['/api/repairs/1/parts'],
  });
  
  return (
    <div className="h-screen flex flex-col">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-4">Replacement Parts</h1>
          
          <div className="mb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search parts..." 
                value={searchQuery}
                onChange={handleSearch}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full flex overflow-x-auto mb-4">
              <TabsTrigger value="all" className="flex-1">All Parts</TabsTrigger>
              <TabsTrigger value="washers" className="flex-1">Washer Parts</TabsTrigger>
              <TabsTrigger value="refrigerators" className="flex-1">Refrigerator Parts</TabsTrigger>
              <TabsTrigger value="dishwashers" className="flex-1">Dishwasher Parts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Skeleton key={item} className="h-40 w-full rounded-lg" />
                  ))}
                </div>
              ) : parts && Array.isArray(parts) && parts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.isArray(parts) && parts.map((part: any) => (
                    <PartCard key={part.id} part={part} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-cogs text-3xl mb-3 block"></i>
                  <p>No parts found</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              )}
            </TabsContent>
            
            {/* Additional tabs for specific appliance categories would go here */}
            <TabsContent value="washers">
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-tshirt text-3xl mb-3 block"></i>
                <p>Washer parts coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="refrigerators">
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-temperature-low text-3xl mb-3 block"></i>
                <p>Refrigerator parts coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="dishwashers">
              <div className="text-center py-8 text-gray-500">
                <i className="fas fa-sink text-3xl mb-3 block"></i>
                <p>Dishwasher parts coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation onScan={handleScan} />
    </div>
  );
}

function PartCard({ part }: { part: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
      <div className="h-48 bg-gray-100">
        <img 
          src={part.imageUrl || "https://placehold.co/400x300?text=Part+Image"} 
          className="w-full h-full object-contain p-4" 
          alt={part.name} 
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-1">Part #{part.partNumber}</p>
          <h3 className="font-medium text-lg mb-1">{part.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{part.description}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">${part.price.toFixed(2)}</span>
          <button className="bg-primary-500 hover:bg-primary-600 text-white font-medium text-sm rounded-lg px-3 py-1">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}