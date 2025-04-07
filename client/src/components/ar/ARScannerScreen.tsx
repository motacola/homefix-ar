import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { useARDetection } from "@/hooks/useARDetection";

interface ARScannerScreenProps {
  onClose: () => void;
  onManualSelect: () => void;
}

export default function ARScannerScreen({ onClose, onManualSelect }: ARScannerScreenProps) {
  const { setShowARGuide, setShowARScanner } = useAppContext();
  const { startDetection, stopDetection, detectionStatus } = useARDetection();

  // Start AR detection when component mounts
  useEffect(() => {
    startDetection();
    
    // After 3 seconds of simulated detection (for demo purposes),
    // transition to the repair guide screen
    const timer = setTimeout(() => {
      setShowARScanner(false);
      setShowARGuide(true);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      stopDetection();
    };
  }, [startDetection, stopDetection, setShowARGuide, setShowARScanner]);

  return (
    <div className="fixed inset-0 bg-black z-40">
      {/* AR Camera View */}
      <div className="h-full w-full relative">
        {/* Camera feed - in a real implementation this would be replaced with the AR.js scene */}
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          {/* This will be replaced by the actual AR camera feed */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-64 h-64 border-2 border-primary-400 rounded-lg relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-1 bg-primary-500/30 animate-pulse"></div>
              </div>
            </div>
            <p className="text-white text-lg mt-6">
              {detectionStatus === 'scanning' ? 'Scanning appliance...' : 'Appliance detected!'}
            </p>
          </div>
        </div>

        {/* AR Scene - Hidden on page load, will be activated by AR.js */}
        <a-scene id="ar-scene" embedded arjs="sourceType: webcam; debugUIEnabled: false;" vr-mode-ui="enabled: false" style={{ display: 'none' }}>
          <a-marker preset="hiro">
            <a-text value="Detecting appliance..." position="0 0.5 0" align="center" color="#FFFFFF"></a-text>
            <a-box position="0 0 0" scale="0.5 0.5 0.5" color="#3B82F6"></a-box>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>

        {/* AR interface elements */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
          <button 
            onClick={onClose}
            className="bg-gray-900/70 rounded-full w-10 h-10 flex items-center justify-center text-white">
            <i className="fas fa-times"></i>
          </button>
          <div className="bg-gray-900/70 rounded-full py-1 px-4 text-white text-sm">
            <i className="fas fa-lightbulb mr-1"></i>
            Point at appliance label
          </div>
        </div>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex justify-between items-center mb-4">
            <button className="bg-gray-900/70 rounded-full py-2 px-4 text-white text-sm">
              <i className="fas fa-bolt mr-1"></i>
              Flash
            </button>
            <button 
              onClick={onManualSelect}
              className="bg-white rounded-full py-2 px-4 text-gray-800 text-sm font-medium">
              <i className="fas fa-list mr-1"></i>
              Select Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
