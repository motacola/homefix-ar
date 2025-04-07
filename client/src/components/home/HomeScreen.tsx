import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import RepairCard from "../common/RepairCard";
import PopularRepairCard from "../common/PopularRepairCard";
import ResourceCard from "../common/ResourceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { 
  Search,
  Camera,
  Wrench,
  BookOpen,
  Clock,
  TrendingUp,
  GraduationCap,
  BarChart3
} from "lucide-react";
import { useEffect, useState } from "react";

interface HomeScreenProps {
  onStartRepair: () => void;
}

type RepairItem = {
  id: number;
  appliance: {
    name: string;
    imageUrl: string;
    brand: string;
  };
  issue: {
    title: string;
    difficulty: string;
    estimatedTime: string;
  };
};

export default function HomeScreen({ onStartRepair }: HomeScreenProps) {
  const [repairCount, setRepairCount] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  
  // For demo purposes, we're using the demo user ID
  const userId = 1;

  // Fetch recent repair history
  const { data: recentRepairs, isLoading: isLoadingRecent } = useQuery<RepairItem[]>({
    queryKey: ['/api/history/1/recent'],
  });

  // Fetch popular repairs
  const { data: popularRepairs, isLoading: isLoadingPopular } = useQuery<any[]>({
    queryKey: ['/api/repairs/popular'],
  });

  // Calculate metrics
  useEffect(() => {
    if (recentRepairs?.length) {
      setRepairCount(recentRepairs.length);
      
      // Calculate average savings of $120 per repair (this would be a real calculation in a real app)
      setMoneySaved(recentRepairs.length * 120);
    }
  }, [recentRepairs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Would navigate to search results in a real app
      console.log(`Searching for: ${searchQuery}`);
    }
  };

  const navigateToExplore = () => {
    window.location.href = '/explore';
  };

  return (
    <div className="min-h-full pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white pt-8 pb-12 px-4 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          {/* Stats Banner - Only show if user has repairs */}
          {repairCount > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-6 flex items-center justify-around">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{repairCount}</p>
                <p className="text-xs uppercase tracking-wide text-white">Repairs</p>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">${moneySaved}</p>
                <p className="text-xs uppercase tracking-wide text-white">Saved</p>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-xs uppercase tracking-wide text-white">Devices</p>
              </div>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Fix it yourself with AR guidance</h2>
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-xl">Save money and reduce waste with step-by-step repair assistance in augmented reality</p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative mb-8 max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-white/60" />
              </div>
              <input 
                type="text" 
                className="block w-full pl-10 pr-10 py-3 bg-white/10 border-0 backdrop-blur-sm placeholder-white/60 text-white rounded-lg focus:ring-2 focus:ring-white/30 focus:bg-white/20 focus:outline-none"
                placeholder="Search for appliances or repairs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
                  <Search className="h-3.5 w-3.5 text-white" />
                </div>
              </button>
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-2">
            <Button 
              onClick={onStartRepair}
              className="bg-secondary-500 hover:bg-secondary-600 text-white gap-2 text-base py-6 px-6 shadow-lg">
              <Camera className="h-5 w-5" />
              <span>Scan Appliance</span>
            </Button>
            <Button 
              onClick={navigateToExplore}
              variant="outline" 
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 gap-2 text-base py-6 px-6">
              <BookOpen className="h-5 w-5" />
              <span>Browse Guides</span>
            </Button>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full"></div>
        <div className="absolute top-16 right-16 w-16 h-16 bg-white/5 rounded-full"></div>
      </div>

      {/* Categories Cards - Quick Access */}
      <div className="px-4 -mt-6 mb-8 relative z-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white shadow-md rounded-lg p-3 text-center hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-50 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-xs font-medium">Kitchen</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-3 text-center hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-50 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-xs font-medium">Laundry</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-3 text-center hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 bg-purple-50 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-xs font-medium">HVAC</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-3 text-center hover:shadow-lg transition cursor-pointer">
              <div className="w-12 h-12 mx-auto mb-2 bg-amber-50 rounded-full flex items-center justify-center">
                <Wrench className="h-6 w-6 text-amber-600" />
              </div>
              <p className="text-xs font-medium">More</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="px-4 py-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary-500" />
              <h3 className="text-xl font-semibold">Recent Repairs</h3>
            </div>
            <Button variant="ghost" className="text-sm text-primary-600 p-0 h-auto">
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingRecent ? (
              // Show loading skeletons
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <Skeleton className="h-32 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <div className="flex items-center justify-between mt-2">
                      <Skeleton className="h-3 w-1/4" />
                      <Skeleton className="h-3 w-1/5" />
                    </div>
                  </div>
                </div>
              ))
            ) : recentRepairs && recentRepairs.length > 0 ? (
              recentRepairs.map((repair: any) => (
                <RepairCard 
                  key={repair.id}
                  title={repair.appliance.name}
                  issue={repair.issue.title}
                  difficulty={repair.issue.difficulty}
                  estimatedTime={repair.issue.estimatedTime}
                  imageUrl={repair.appliance.imageUrl}
                />
              ))
            ) : (
              <div className="col-span-full bg-gray-50 rounded-lg border border-gray-200 text-center py-8 text-gray-500">
                <Clock className="h-10 w-10 mx-auto mb-3 text-gray-400" />
                <h4 className="font-medium text-gray-700 mb-1">No recent repairs</h4>
                <p className="text-sm mt-1 max-w-md mx-auto">Start a new repair to see your history here. Your recent repairs will appear for quick access.</p>
                <Button 
                  onClick={onStartRepair}
                  className="mt-4 bg-primary-600 hover:bg-primary-700">
                  Start Your First Repair
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popular Repairs */}
      <div className="px-4 py-4 bg-gray-50 mt-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary-500" />
              <h3 className="text-xl font-semibold">Popular Repairs</h3>
            </div>
            <Button variant="ghost" className="text-sm text-primary-600 p-0 h-auto">
              See All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingPopular ? (
              // Show loading skeletons
              Array(3).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex">
                  <Skeleton className="w-1/3 h-full" />
                  <div className="w-2/3 p-3">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-6 w-1/4" />
                  </div>
                </div>
              ))
            ) : popularRepairs && popularRepairs.length > 0 ? (
              popularRepairs.map((repair: any) => (
                <PopularRepairCard 
                  key={repair.id}
                  title={repair.title}
                  applianceName={repair.appliance ? `For ${repair.appliance.brand} models` : ''}
                  difficulty={repair.difficulty}
                  imageUrl={repair.appliance ? repair.appliance.imageUrl : ''}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                <i className="fas fa-exclamation-circle text-3xl mb-3 block"></i>
                <p>No popular repairs available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Resources */}
      <div className="px-4 py-6 mt-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2 text-primary-500" />
              <h3 className="text-xl font-semibold">Learning Resources</h3>
            </div>
            <Button variant="ghost" className="text-sm text-primary-600 p-0 h-auto">
              All Resources
            </Button>
          </div>
          
          {/* Featured Learning Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6 p-6 shadow-sm border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-4 md:mb-0 md:pr-6">
                <h3 className="text-xl font-bold text-blue-900 mb-2">DIY Appliance Repair 101</h3>
                <p className="text-blue-700 mb-4">Essential tools, safety tips, and troubleshooting techniques for beginners.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-40 h-40 bg-white rounded-full shadow-md flex items-center justify-center">
                  <GraduationCap className="w-20 h-20 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard 
              title="Repair Basics"
              description="Essential safety tips and common tools guide"
              icon="fas fa-graduation-cap"
              iconBgColor="bg-primary-100"
              iconColor="text-primary-600"
              buttonText="Learn More"
            />
            <ResourceCard 
              title="Tool Library"
              description="Detailed guide to home appliance repair tools"
              icon="fas fa-tools"
              iconBgColor="bg-secondary-100"
              iconColor="text-secondary-600"
              buttonText="Browse Tools"
            />
          </div>
        </div>
      </div>

      {/* Repair Stats Section */}
      <div className="px-4 py-6 bg-gray-900 text-white mt-8">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Join our growing community</h3>
            <p className="text-gray-300 max-w-xl mx-auto">HomeFix AR has helped thousands of people save money and extend the life of their appliances</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-400">5,000+</p>
              <p className="text-sm text-gray-300">Repairs Completed</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-400">$750k</p>
              <p className="text-sm text-gray-300">Money Saved</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-400">25+</p>
              <p className="text-sm text-gray-300">Appliance Types</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button className="bg-white text-gray-900 hover:bg-gray-100" size="lg">
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
