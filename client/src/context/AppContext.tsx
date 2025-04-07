import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  showARScanner: boolean;
  showARGuide: boolean;
  showApplianceModal: boolean;
  currentApplianceId: number | null;
  currentRepairId: number | null;
  currentStep: number;
  setShowARScanner: (show: boolean) => void;
  setShowARGuide: (show: boolean) => void;
  setShowApplianceModal: (show: boolean) => void;
  setCurrentApplianceId: (id: number | null) => void;
  setCurrentRepairId: (id: number | null) => void;
  setCurrentStep: (step: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [showARScanner, setShowARScanner] = useState(false);
  const [showARGuide, setShowARGuide] = useState(false);
  const [showApplianceModal, setShowApplianceModal] = useState(false);
  const [currentApplianceId, setCurrentApplianceId] = useState<number | null>(null);
  const [currentRepairId, setCurrentRepairId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const value = {
    showARScanner,
    showARGuide,
    showApplianceModal,
    currentApplianceId,
    currentRepairId,
    currentStep,
    setShowARScanner,
    setShowARGuide,
    setShowApplianceModal,
    setCurrentApplianceId,
    setCurrentRepairId,
    setCurrentStep
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
