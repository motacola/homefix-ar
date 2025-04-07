import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RepairCard from "@/components/common/RepairCard";
import { Link } from "wouter";

export default function Profile() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const handleScan = () => {
    // Redirect to home page for scanning functionality
    window.location.href = "/";
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  // For demo purposes, using user ID 1
  const userId = 1;
  
  // Fetch user repair history
  const { data: repairHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['/api/history/1'],
  });
  
  return (
    <div className="h-screen flex flex-col">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="bg-primary-600 text-white pt-6 pb-8 px-4">
          <div className="container mx-auto">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-primary-300 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-user text-2xl"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-primary-100">DIY Repair Enthusiast</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <div className="bg-primary-700/50 rounded-lg p-3 flex-1 text-center">
                <div className="text-2xl font-bold">{repairHistory && Array.isArray(repairHistory) ? repairHistory.length : "0"}</div>
                <div className="text-sm text-primary-100">Repairs</div>
              </div>
              <div className="bg-primary-700/50 rounded-lg p-3 flex-1 text-center">
                <div className="text-2xl font-bold">$345</div>
                <div className="text-sm text-primary-100">Saved</div>
              </div>
              <div className="bg-primary-700/50 rounded-lg p-3 flex-1 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-primary-100">Appliances</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto py-4 px-4">
          <Tabs defaultValue="history">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="history" className="flex-1">Repair History</TabsTrigger>
              <TabsTrigger value="saved" className="flex-1">Saved Guides</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="history">
              <h3 className="text-lg font-medium mb-3">Your Repair History</h3>
              
              {isLoadingHistory ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3].map((item) => (
                    <Skeleton key={item} className="h-40 w-full rounded-lg" />
                  ))}
                </div>
              ) : repairHistory && Array.isArray(repairHistory) && repairHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.isArray(repairHistory) && repairHistory.map((repair: any) => (
                    <RepairCard 
                      key={repair.id}
                      title={repair.appliance.name}
                      issue={repair.issue.title}
                      difficulty={repair.issue.difficulty}
                      estimatedTime={repair.issue.estimatedTime}
                      imageUrl={repair.appliance.imageUrl}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                  <i className="fas fa-history text-3xl mb-3 block"></i>
                  <p>No repair history yet</p>
                  <p className="text-sm mt-1">Your completed repairs will appear here</p>
                  <button className="mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg">
                    Start Your First Repair
                  </button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved">
              <h3 className="text-lg font-medium mb-3">Saved Repair Guides</h3>
              
              <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                <i className="fas fa-bookmark text-3xl mb-3 block"></i>
                <p>No saved guides yet</p>
                <p className="text-sm mt-1">Bookmark repair guides to access them quickly</p>
                <button className="mt-4 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg">
                  Explore Guides
                </button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <h3 className="text-lg font-medium mb-3">Settings</h3>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Notifications</h4>
                    <p className="text-sm text-gray-500">Receive updates and reminders</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">AR Features</h4>
                    <p className="text-sm text-gray-500">Enable augmented reality guidance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" checked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="p-4">
                  <button className="w-full text-left text-red-600 font-medium">
                    Sign Out
                  </button>
                </div>
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