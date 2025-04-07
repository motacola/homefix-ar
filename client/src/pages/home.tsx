import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import HomeScreen from "@/components/home/HomeScreen";
import ARScannerScreen from "@/components/ar/ARScannerScreen";
import ARRepairGuideScreen from "@/components/ar/ARRepairGuideScreen";
import ApplianceSelectionModal from "@/components/modals/ApplianceSelectionModal";

export default function Home() {
  // Local state instead of using AppContext
  const [showARScanner, setShowARScanner] = useState(false);
  const [showARGuide, setShowARGuide] = useState(false);
  const [showApplianceModal, setShowApplianceModal] = useState(false);
  const [currentApplianceId, setCurrentApplianceId] = useState<number | null>(null);
  const [currentRepairId, setCurrentRepairId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleStartRepair = () => {
    setShowARScanner(true);
  };

  const handleScan = () => {
    setShowARScanner(true);
  };

  const handleCloseARScanner = () => {
    setShowARScanner(false);
  };

  const handleBackToScanner = () => {
    setShowARGuide(false);
    setShowARScanner(true);
  };

  const handleOpenApplianceSelection = () => {
    setShowApplianceModal(true);
  };

  const handleCloseApplianceSelection = () => {
    setShowApplianceModal(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Home Screen (default visible) */}
        {!showARScanner && !showARGuide && (
          <HomeScreen onStartRepair={handleStartRepair} />
        )}

        {/* AR Scanner Screen */}
        {showARScanner && (
          <ARScannerScreen 
            onClose={handleCloseARScanner} 
            onManualSelect={handleOpenApplianceSelection} 
          />
        )}

        {/* AR Repair Guide Screen */}
        {showARGuide && (
          <ARRepairGuideScreen onBack={handleBackToScanner} />
        )}

        {/* Manual Appliance Selection Modal */}
        {showApplianceModal && (
          <ApplianceSelectionModal onClose={handleCloseApplianceSelection} />
        )}
      </main>

      {/* Bottom Navigation */}
      {!showARScanner && !showARGuide && (
        <BottomNavigation onScan={handleScan} />
      )}
    </div>
  );
}
