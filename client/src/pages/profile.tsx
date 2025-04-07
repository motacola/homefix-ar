import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RepairCard from "@/components/common/RepairCard";
import { Link, useLocation } from "wouter";
import {
  User,
  History,
  Bookmark,
  Settings,
  Medal,
  Gift,
  DollarSign,
  MapPin,
  Moon,
  Bell,
  Phone,
  LogOut,
  ChevronRight,
  Heart,
  Award,
  Wrench,
  Hammer,
  Camera,
  Cog
} from "lucide-react";

export default function Profile() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  
  const handleScan = () => {
    setLocation("/");
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  // For demo purposes, using user ID 1
  const userId = 1;
  
  // Fetch user repair history
  const { data: repairHistory, isLoading: isLoadingHistory } = useQuery<any[]>({
    queryKey: ['/api/history/1'],
  });

  // Calculate user metrics
  const repairCount = repairHistory?.length || 0;
  const moneySaved = repairCount * 115; // Average savings per repair
  const applianceCount = repairHistory ? new Set(repairHistory.map(item => item.appliance?.id)).size : 0;
  
  // Format money as USD currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Toggle handlers with state control
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [arFeaturesEnabled, setArFeaturesEnabled] = useState(true);
  
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-8 pb-10 px-4 relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/5 rounded-full"></div>
          <div className="absolute top-0 left-10 w-10 h-10 bg-white/5 rounded-full"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="flex items-center">
              <div className="w-20 h-20 bg-primary-300 rounded-full flex items-center justify-center mr-5 shadow-lg border-2 border-white/30">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <Badge variant="secondary" className="bg-primary-400/30 text-white border-primary-400/50">Pro</Badge>
                </div>
                <p className="text-primary-100 mt-1">DIY Repair Enthusiast</p>
                <div className="flex items-center gap-3 mt-2">
                  <Badge variant="outline" className="border-white/30 text-white/90 px-2 py-0 h-6 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> New York
                  </Badge>
                  <Badge variant="outline" className="border-white/30 text-white/90 px-2 py-0 h-6 flex items-center gap-1">
                    <History className="h-3 w-3" /> Joined 2023
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Stats Banner */}
            <div className="flex gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex-1 text-center">
                <div className="text-3xl font-bold">{repairCount}</div>
                <div className="text-xs text-white/80 uppercase tracking-wider mt-1">Repairs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex-1 text-center">
                <div className="text-3xl font-bold">{formatCurrency(moneySaved)}</div>
                <div className="text-xs text-white/80 uppercase tracking-wider mt-1">Saved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex-1 text-center">
                <div className="text-3xl font-bold">{applianceCount}</div>
                <div className="text-xs text-white/80 uppercase tracking-wider mt-1">Appliances</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Achievement Bar */}
        <div className="container mx-auto px-4 -mt-5 mb-4 relative z-20">
          <div className="bg-white rounded-lg shadow-md p-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-amber-50 rounded-full h-10 w-10 flex items-center justify-center text-amber-500">
                <Medal className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Level 2 Technician</h3>
                <div className="text-xs text-gray-500">3 more repairs to reach Level 3</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-primary-600">
              <Gift className="h-4 w-4 mr-1" /> Rewards
            </Button>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="container mx-auto px-4 pt-2">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-3 h-12 overflow-hidden">
              <TabsTrigger value="history" className="flex-1 flex items-center justify-center gap-1.5 data-[state=active]:text-primary-600">
                <History className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex-1 flex items-center justify-center gap-1.5 data-[state=active]:text-primary-600">
                <Bookmark className="h-4 w-4" />
                <span>Saved</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 flex items-center justify-center gap-1.5 data-[state=active]:text-primary-600">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Repair History Tab */}
            <TabsContent value="history" className="focus:outline-none">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Repair History</h3>
                <Button variant="outline" size="sm" className="text-sm">
                  Filter
                </Button>
              </div>
              
              {isLoadingHistory ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                      <Skeleton className="h-36 w-full" />
                      <div className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-3 w-1/2 mb-3" />
                        <div className="flex items-center justify-between">
                          <Skeleton className="h-3 w-1/4" />
                          <Skeleton className="h-6 w-1/5 rounded-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : repairHistory && repairHistory.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repairHistory.map((repair: any) => (
                    <div key={repair.id} className="group relative">
                      <RepairCard 
                        title={repair.appliance.name}
                        issue={repair.issue.title}
                        difficulty={repair.issue.difficulty}
                        estimatedTime={repair.issue.estimatedTime}
                        imageUrl={repair.appliance.imageUrl}
                      />
                      <div className="absolute top-2 right-2 hidden group-hover:block">
                        <Button variant="secondary" size="icon" className="h-7 w-7 bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white">
                          <Heart className="h-4 w-4 text-rose-500" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                      <Hammer className="h-8 w-8 text-primary-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No repair history yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md">
                      Your completed repairs will appear here. Start a repair to build your history and track your savings.
                    </p>
                    <Button 
                      className="bg-primary-600 hover:bg-primary-700"
                      onClick={handleScan}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Start Your First Repair
                    </Button>
                  </div>
                </div>
              )}

              {/* Completed Achievements Section */}
              {repairHistory && repairHistory.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 text-center">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Award className="h-5 w-5 text-blue-500" />
                      </div>
                      <h4 className="font-medium text-sm">First Repair</h4>
                      <p className="text-xs text-gray-500 mt-1">Completed</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 text-center">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                      </div>
                      <h4 className="font-medium text-sm">Money Saver</h4>
                      <p className="text-xs text-gray-500 mt-1">Saved $100+</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 text-center">
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Wrench className="h-5 w-5 text-purple-500" />
                      </div>
                      <h4 className="font-medium text-sm">DIY Expert</h4>
                      <p className="text-xs text-gray-500 mt-1">3 Complex Repairs</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3 text-center opacity-60">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Hammer className="h-5 w-5 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-sm">Jack of All Trades</h4>
                      <p className="text-xs text-gray-500 mt-1">Locked</p>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Saved Guides Tab */}
            <TabsContent value="saved" className="focus:outline-none">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Saved Repair Guides</h3>
                <Button variant="outline" size="sm" className="text-sm">
                  Collections
                </Button>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mb-4">
                    <Bookmark className="h-8 w-8 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved guides yet</h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    Bookmark repair guides to access them quickly later. Saved guides can be accessed offline.
                  </p>
                  <Link href="/explore">
                    <Button className="bg-primary-600 hover:bg-primary-700">
                      Explore Guides
                    </Button>
                  </Link>
                </div>
              </div>
            </TabsContent>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="focus:outline-none pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y">
                {/* Profile Settings Section */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Profile</h4>
                  
                  <Link href="/settings">
                    <div className="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">Personal Information</div>
                          <div className="text-sm text-gray-500">Update your profile details</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                  
                  <Link href="/settings">
                    <div className="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mr-3">
                          <Phone className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                          <div className="font-medium">Connected Devices</div>
                          <div className="text-sm text-gray-500">Manage your connected appliances</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                </div>
                
                {/* Appearance Settings Section */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Appearance</h4>
                  
                  <div className="flex items-center justify-between py-3 px-1">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mr-3">
                        <Moon className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="font-medium">Dark Mode</div>
                        <div className="text-sm text-gray-500">Switch between light and dark themes</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={darkModeEnabled}
                        onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
                
                {/* Notification Settings Section */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Notifications</h4>
                  
                  <div className="flex items-center justify-between py-3 px-1">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mr-3">
                        <Bell className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-gray-500">Receive updates and reminders</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationsEnabled}
                        onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
                
                {/* App Settings Section */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Application</h4>
                  
                  <div className="flex items-center justify-between py-3 px-1">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mr-3">
                        <Cog className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="font-medium">AR Features</div>
                        <div className="text-sm text-gray-500">Enable augmented reality guidance</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={arFeaturesEnabled}
                        onChange={() => setArFeaturesEnabled(!arFeaturesEnabled)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <Link href="/settings">
                    <div className="flex items-center justify-between py-3 px-1 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                          <Settings className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="font-medium">Advanced Settings</div>
                          <div className="text-sm text-gray-500">Configure app behavior</div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </Link>
                </div>
                
                {/* Account Actions Section */}
                <div className="p-4">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Account</h4>
                  
                  <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 mt-2">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">HomeFix AR v1.0.3</p>
                <p className="text-xs text-gray-400 mt-1">© 2025 HomeFix Technologies Inc.</p>
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