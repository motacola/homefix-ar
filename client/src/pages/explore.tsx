import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { useAppContext } from "@/context/AppContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APPLIANCE_TYPES } from "@/lib/constants";

export default function Explore() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { setShowARScanner } = useAppContext();
  
  const handleScan = () => {
    setShowARScanner(true);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  // Fetch all appliances
  const { data: appliances, isLoading: isLoadingAppliances } = useQuery({
    queryKey: ['/api/appliances'],
  });
  
  return (
    <div className="h-screen flex flex-col">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold mb-4">Explore Appliances</h1>
          
          <div className="mb-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search appliances..." 
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="w-full flex overflow-x-auto mb-4">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="washing_machine" className="flex-1">Washers</TabsTrigger>
              <TabsTrigger value="refrigerator" className="flex-1">Refrigerators</TabsTrigger>
              <TabsTrigger value="dishwasher" className="flex-1">Dishwashers</TabsTrigger>
              <TabsTrigger value="microwave" className="flex-1">Microwaves</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {isLoadingAppliances ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Skeleton key={item} className="h-32 w-full rounded-lg" />
                  ))}
                </div>
              ) : appliances && Array.isArray(appliances) && appliances.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {appliances.map((appliance: any) => (
                    <ApplianceCard key={appliance.id} appliance={appliance} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-box-open text-3xl mb-3 block"></i>
                  <p>No appliances found</p>
                </div>
              )}
            </TabsContent>
            
            {Object.values(APPLIANCE_TYPES).map((type) => (
              <TabsContent key={type} value={type}>
                {isLoadingAppliances ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((item) => (
                      <Skeleton key={item} className="h-32 w-full rounded-lg" />
                    ))}
                  </div>
                ) : appliances && Array.isArray(appliances) && appliances.filter((a: any) => a.type === type).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.isArray(appliances) && appliances
                      .filter((appliance: any) => appliance.type === type)
                      .map((appliance: any) => (
                        <ApplianceCard key={appliance.id} appliance={appliance} />
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <i className="fas fa-box-open text-3xl mb-3 block"></i>
                    <p>No {type.replace('_', ' ')} found</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation onScan={handleScan} />
    </div>
  );
}

function ApplianceCard({ appliance }: { appliance: any }) {
  // Function to get icon based on appliance type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case APPLIANCE_TYPES.WASHING_MACHINE:
        return "fas fa-tshirt";
      case APPLIANCE_TYPES.REFRIGERATOR:
        return "fas fa-temperature-low";
      case APPLIANCE_TYPES.DISHWASHER:
        return "fas fa-sink";
      case APPLIANCE_TYPES.MICROWAVE:
        return "fas fa-radiation";
      case APPLIANCE_TYPES.DRYER:
        return "fas fa-wind";
      case APPLIANCE_TYPES.OVEN:
        return "fas fa-fire";
      case APPLIANCE_TYPES.STOVE:
        return "fas fa-burn";
      default:
        return "fas fa-box";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="h-32 bg-gray-200 relative">
        <img 
          src={appliance.imageUrl || "https://placehold.co/400x200?text=No+Image"} 
          className="w-full h-full object-cover" 
          alt={appliance.name} 
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-2">
          <i className={`${getTypeIcon(appliance.type)} text-gray-600`}></i>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{appliance.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{appliance.brand} {appliance.model}</p>
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          View Repairs <i className="fas fa-chevron-right ml-1"></i>
        </button>
      </div>
    </div>
  );
}