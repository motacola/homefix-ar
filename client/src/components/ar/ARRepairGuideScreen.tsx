import { useState } from "react";

interface ARRepairGuideScreenProps {
  onBack: () => void;
}

export default function ARRepairGuideScreen({ onBack }: ARRepairGuideScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* AR View */}
      <div className="h-full w-full relative">
        {/* Camera feed with AR overlay - this would be replaced with the actual AR.js implementation */}
        <div className="absolute inset-0 bg-gray-800">
          {/* This is where the AR scene would go in a real implementation */}
          
          {/* AR Markers (would be rendered by AR.js in actual implementation) */}
          <div className="absolute top-1/3 left-1/4 bg-primary-500/30 p-2 rounded-lg border-2 border-primary-500 w-20 h-20 flex items-center justify-center animate-pulse">
            <div className="text-center">
              <div className="text-white font-bold">Screw 1</div>
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 bg-primary-500/30 p-2 rounded-lg border-2 border-primary-500 w-20 h-20 flex items-center justify-center animate-pulse">
            <div className="text-center">
              <div className="text-white font-bold">Screw 2</div>
            </div>
          </div>
        </div>

        {/* Top navigation */}
        <div className="absolute top-0 left-0 right-0 bg-gray-900/80 p-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="text-white">
            <i className="fas fa-arrow-left mr-1"></i>
            Back
          </button>
          <div className="text-white font-medium">Samsung Washer WF45R6100</div>
          <button className="text-white">
            <i className="fas fa-ellipsis-v"></i>
          </button>
        </div>

        {/* Step Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg">
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-gray-500 text-sm">Step {currentStep} of {totalSteps}</div>
              <div className="flex">
                <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                  <i className="fas fa-volume-up"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-400">
                  <i className="fas fa-expand"></i>
                </button>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-200 rounded-full mb-4">
              <div 
                className="h-1 bg-primary-500 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>
            
            {/* Step content - would be dynamic based on the current step */}
            {currentStep === 1 && (
              <>
                {/* Safety warning */}
                <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                  <div className="flex items-start">
                    <i className="fas fa-exclamation-triangle text-red-500 mt-1 mr-2"></i>
                    <div>
                      <h4 className="font-medium text-red-800">SAFETY FIRST</h4>
                      <p className="text-sm text-red-700">Unplug the washer before proceeding with any repair.</p>
                    </div>
                  </div>
                </div>
              
                <h3 className="text-xl font-bold mb-2">Unplug the washer</h3>
                <p className="text-gray-700 mb-4">For safety, unplug the washer from the electrical outlet before beginning any repair.</p>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h3 className="text-xl font-bold mb-2">Remove Back Panel</h3>
                <p className="text-gray-700 mb-4">Locate and remove the 4 screws holding the back panel using a Phillips screwdriver.</p>
              </>
            )}

            {currentStep > 2 && (
              <>
                <h3 className="text-xl font-bold mb-2">Step {currentStep}</h3>
                <p className="text-gray-700 mb-4">This is step {currentStep} of the repair guide.</p>
              </>
            )}
            
            {/* Controls */}
            <div className="flex justify-between">
              <button 
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`${
                  currentStep === 1 
                    ? 'bg-gray-100 text-gray-400' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                } font-medium py-2 px-4 rounded-lg`}>
                <i className="fas fa-chevron-left mr-1"></i>
                Previous
              </button>
              <button 
                onClick={handleNext}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg">
                {currentStep === totalSteps ? 'Finish' : 'Next'}
                {currentStep !== totalSteps && <i className="fas fa-chevron-right ml-1"></i>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
