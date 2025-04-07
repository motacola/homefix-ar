import { useQuery } from "@tanstack/react-query";
import RepairCard from "../common/RepairCard";
import PopularRepairCard from "../common/PopularRepairCard";
import ResourceCard from "../common/ResourceCard";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeScreenProps {
  onStartRepair: () => void;
}

export default function HomeScreen({ onStartRepair }: HomeScreenProps) {
  // For demo purposes, we're using the demo user ID
  const userId = 1;

  // Fetch recent repair history
  const { data: recentRepairs, isLoading: isLoadingRecent } = useQuery({
    queryKey: ['/api/history/1/recent'],
  });

  // Fetch popular repairs
  const { data: popularRepairs, isLoading: isLoadingPopular } = useQuery({
    queryKey: ['/api/repairs/popular'],
  });

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Fix your appliances with AR guidance</h2>
          <p className="text-lg mb-6 text-white/90">Save money and reduce waste with DIY repairs</p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={onStartRepair}
              className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold rounded-lg px-6 py-3 flex items-center transition">
              <i className="fas fa-camera mr-2"></i>
              Start Repair
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg px-6 py-3 flex items-center transition">
              <i className="fas fa-book-open mr-2"></i>
              Browse Guides
            </button>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="px-4 py-6">
        <div className="container mx-auto">
          <h3 className="text-xl font-semibold mb-4">Recently Viewed</h3>
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
              <div className="col-span-full text-center py-8 text-gray-500">
                <i className="fas fa-history text-3xl mb-3 block"></i>
                <p>No recent repairs</p>
                <p className="text-sm mt-1">Start a new repair to see your history here</p>
              </div>
            )}
          </div>
          {recentRepairs && recentRepairs.length > 0 && (
            <div className="text-center mt-2">
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                View All History
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Popular Repairs */}
      <div className="px-4 py-6 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-xl font-semibold mb-4">Popular Repairs</h3>
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
      <div className="px-4 py-6">
        <div className="container mx-auto">
          <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResourceCard 
              title="Repair Basics"
              description="Essential safety tips and tool guides"
              icon="fas fa-graduation-cap"
              iconBgColor="bg-primary-100"
              iconColor="text-primary-600"
              buttonText="Learn More"
            />
            <ResourceCard 
              title="Tool Library"
              description="Common tools needed for appliance repair"
              icon="fas fa-tools"
              iconBgColor="bg-secondary-100"
              iconColor="text-secondary-600"
              buttonText="Browse Tools"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
