import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppContext } from "@/context/AppContext";

interface ApplianceSelectionModalProps {
  onClose: () => void;
}

export default function ApplianceSelectionModal({ onClose }: ApplianceSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedApplianceId, setSelectedApplianceId] = useState<number | null>(null);
  const { setShowARGuide, setShowARScanner, setShowApplianceModal } = useAppContext();

  // Fetch all appliances
  const { data: appliances, isLoading } = useQuery({
    queryKey: ['/api/appliances'],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = (id: number) => {
    setSelectedApplianceId(id);
  };

  const handleContinue = () => {
    // Close the modal and show the repair guide
    setShowApplianceModal(false);
    setShowARScanner(false);
    setShowARGuide(true);
  };

  // Filter appliances by type
  const washingMachines = appliances?.filter((a: any) => a.type === 'washing_machine') || [];
  const refrigerators = appliances?.filter((a: any) => a.type === 'refrigerator') || [];
  const dishwashers = appliances?.filter((a: any) => a.type === 'dishwasher') || [];
  const microwaves = appliances?.filter((a: any) => a.type === 'microwave') || [];

  return (
    <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Select Your Appliance</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search appliances..." 
              value={searchQuery}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {isLoading ? (
            <div className="p-4">
              <Skeleton className="h-4 w-1/3 mb-4" />
              <Skeleton className="h-16 w-full mb-2" />
              <Skeleton className="h-16 w-full mb-2" />
              <Skeleton className="h-4 w-1/3 mb-4 mt-4" />
              <Skeleton className="h-16 w-full mb-2" />
            </div>
          ) : (
            <div className="p-2">
              {/* Washing Machines */}
              {washingMachines.length > 0 && (
                <>
                  <h4 className="text-sm text-gray-500 px-2 py-1 uppercase font-medium">Washing Machines</h4>
                  {washingMachines.map((machine: any) => (
                    <div 
                      key={machine.id}
                      onClick={() => handleSelect(machine.id)}
                      className={`p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                        selectedApplianceId === machine.id ? 'bg-primary-50 border border-primary-200' : ''
                      }`}>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-tshirt text-gray-500"></i>
                        </div>
                        <div>
                          <div className="font-medium">{machine.name}</div>
                          <div className="text-sm text-gray-500">
                            {machine.yearStart && machine.yearEnd 
                              ? `${machine.brand}, ${machine.yearStart}-${machine.yearEnd}`
                              : machine.brand
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Refrigerators */}
              {refrigerators.length > 0 && (
                <>
                  <h4 className="text-sm text-gray-500 px-2 py-1 uppercase font-medium mt-2">Refrigerators</h4>
                  {refrigerators.map((fridge: any) => (
                    <div 
                      key={fridge.id}
                      onClick={() => handleSelect(fridge.id)}
                      className={`p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                        selectedApplianceId === fridge.id ? 'bg-primary-50 border border-primary-200' : ''
                      }`}>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-temperature-low text-gray-500"></i>
                        </div>
                        <div>
                          <div className="font-medium">{fridge.name}</div>
                          <div className="text-sm text-gray-500">
                            {fridge.yearStart && fridge.yearEnd 
                              ? `${fridge.brand}, ${fridge.yearStart}-${fridge.yearEnd}`
                              : fridge.brand
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Dishwashers */}
              {dishwashers.length > 0 && (
                <>
                  <h4 className="text-sm text-gray-500 px-2 py-1 uppercase font-medium mt-2">Dishwashers</h4>
                  {dishwashers.map((dishwasher: any) => (
                    <div 
                      key={dishwasher.id}
                      onClick={() => handleSelect(dishwasher.id)}
                      className={`p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                        selectedApplianceId === dishwasher.id ? 'bg-primary-50 border border-primary-200' : ''
                      }`}>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-sink text-gray-500"></i>
                        </div>
                        <div>
                          <div className="font-medium">{dishwasher.name}</div>
                          <div className="text-sm text-gray-500">
                            {dishwasher.yearStart && dishwasher.yearEnd 
                              ? `${dishwasher.brand}, ${dishwasher.yearStart}-${dishwasher.yearEnd}`
                              : dishwasher.brand
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Microwaves */}
              {microwaves.length > 0 && (
                <>
                  <h4 className="text-sm text-gray-500 px-2 py-1 uppercase font-medium mt-2">Microwaves</h4>
                  {microwaves.map((microwave: any) => (
                    <div 
                      key={microwave.id}
                      onClick={() => handleSelect(microwave.id)}
                      className={`p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                        selectedApplianceId === microwave.id ? 'bg-primary-50 border border-primary-200' : ''
                      }`}>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <i className="fas fa-radiation text-gray-500"></i>
                        </div>
                        <div>
                          <div className="font-medium">{microwave.name}</div>
                          <div className="text-sm text-gray-500">
                            {microwave.yearStart && microwave.yearEnd 
                              ? `${microwave.brand}, ${microwave.yearStart}-${microwave.yearEnd}`
                              : microwave.brand
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {!isLoading && (!appliances || appliances.length === 0) && (
                <div className="p-4 text-center text-gray-500">
                  <i className="fas fa-exclamation-circle text-3xl mb-2"></i>
                  <p>No appliances found</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleContinue}
            disabled={!selectedApplianceId}
            className={`${
              !selectedApplianceId 
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600'
            } text-white font-medium py-2 px-4 rounded-lg w-full`}>
            Select & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
