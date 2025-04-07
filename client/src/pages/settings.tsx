import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { 
  DEFAULT_USER_SETTINGS,
  THEME_OPTIONS,
  LANGUAGE_OPTIONS,
  CAMERA_RESOLUTION,
  DATA_USAGE,
  DIFFICULTY_LEVELS
} from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  AlertCircle, 
  ArrowLeft, 
  BellRing,
  Volume2, 
  Wifi, 
  Shield, 
  HelpCircle,
  Save,
  Smartphone,
  Languages,
  Moon,
  Sun,
  Trash2,
  Download,
  Upload,
  Camera,
  Sparkles
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Settings() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [location, navigate] = useLocation();

  // Initialize with defaults, then load from localStorage if available
  const [settings, setSettings] = useState({
    skillLevel: DEFAULT_USER_SETTINGS.SKILL_LEVEL,
    showSafetyWarnings: DEFAULT_USER_SETTINGS.SHOW_SAFETY_WARNINGS,
    useArWhenAvailable: DEFAULT_USER_SETTINGS.USE_AR_WHEN_AVAILABLE,
    soundEnabled: DEFAULT_USER_SETTINGS.SOUND_ENABLED,
    downloadGuidesWifiOnly: DEFAULT_USER_SETTINGS.DOWNLOAD_GUIDES_WIFI_ONLY,
    theme: 'light',
    language: 'english',
    cameraResolution: 'high',
    notifications: true,
    dataUsage: 'balanced'
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({
          ...prev,
          ...parsedSettings
        }));
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleScan = () => {
    navigate('/');
  };

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('userSettings', JSON.stringify(settings));
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 500);
  };

  const resetToDefaults = () => {
    setSettings({
      skillLevel: DEFAULT_USER_SETTINGS.SKILL_LEVEL,
      showSafetyWarnings: DEFAULT_USER_SETTINGS.SHOW_SAFETY_WARNINGS,
      useArWhenAvailable: DEFAULT_USER_SETTINGS.USE_AR_WHEN_AVAILABLE,
      soundEnabled: DEFAULT_USER_SETTINGS.SOUND_ENABLED,
      downloadGuidesWifiOnly: DEFAULT_USER_SETTINGS.DOWNLOAD_GUIDES_WIFI_ONLY,
      theme: 'light',
      language: 'english',
      cameraResolution: 'high',
      notifications: true,
      dataUsage: 'balanced'
    });
    
    toast({
      title: "Settings reset",
      description: "All settings have been restored to defaults.",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={saveSettings} 
              disabled={isSaving}
              className="flex items-center gap-1"
            >
              {isSaving ? "Saving..." : (
                <>
                  <Save size={16} />
                  <span>Save</span>
                </>
              )}
            </Button>
          </div>

          <Accordion type="single" collapsible defaultValue="app-settings" className="mb-6">
            <AccordionItem value="app-settings" className="border rounded-lg shadow-sm overflow-hidden bg-white">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary-500" />
                  <h2 className="text-lg font-medium">Application Settings</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {/* Theme Toggle */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {settings.theme === 'light' ? (
                          <Sun className="h-5 w-5 text-amber-500 mr-3" />
                        ) : (
                          <Moon className="h-5 w-5 text-indigo-400 mr-3" />
                        )}
                        <div>
                          <h3 className="font-medium text-gray-800">Theme</h3>
                          <p className="text-sm text-gray-500">Choose light or dark mode</p>
                        </div>
                      </div>
                      <Select 
                        value={settings.theme}
                        onValueChange={(value) => updateSetting('theme', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Language */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Languages className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Language</h3>
                          <p className="text-sm text-gray-500">Set app language</p>
                        </div>
                      </div>
                      <Select 
                        value={settings.language}
                        onValueChange={(value) => updateSetting('language', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BellRing className="h-5 w-5 text-orange-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Notifications</h3>
                          <p className="text-sm text-gray-500">Enable app notifications</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.notifications}
                        onCheckedChange={(checked) => updateSetting('notifications', checked)}
                      />
                    </div>
                  </div>

                  {/* Data Usage */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Download className="h-5 w-5 text-purple-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Data Usage</h3>
                          <p className="text-sm text-gray-500">Manage network data consumption</p>
                        </div>
                      </div>
                      <Select 
                        value={settings.dataUsage}
                        onValueChange={(value) => updateSetting('dataUsage', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Data usage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="repair-settings" className="border rounded-lg shadow-sm overflow-hidden bg-white mt-4">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary-500" />
                  <h2 className="text-lg font-medium">Repair Experience</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {/* Skill Level */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-800">Skill Level</h3>
                        <p className="text-sm text-gray-500">Set your DIY repair skill level</p>
                      </div>
                      <Select 
                        value={settings.skillLevel}
                        onValueChange={(value) => updateSetting('skillLevel', value)}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="medium">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Safety Warnings */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Safety Warnings</h3>
                          <p className="text-sm text-gray-500">Show safety alerts during repairs</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.showSafetyWarnings}
                        onCheckedChange={(checked) => updateSetting('showSafetyWarnings', checked)}
                      />
                    </div>
                  </div>

                  {/* Sound */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Volume2 className="h-5 w-5 text-green-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Sound</h3>
                          <p className="text-sm text-gray-500">Enable sound effects and voice guidance</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.soundEnabled}
                        onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ar-settings" className="border rounded-lg shadow-sm overflow-hidden bg-white mt-4">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary-500" />
                  <h2 className="text-lg font-medium">AR Experience</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {/* AR Usage */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-blue-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Use AR When Available</h3>
                          <p className="text-sm text-gray-500">Prefer AR for repair guidance</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.useArWhenAvailable}
                        onCheckedChange={(checked) => updateSetting('useArWhenAvailable', checked)}
                      />
                    </div>
                  </div>

                  {/* Camera Resolution */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Camera className="h-5 w-5 text-indigo-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Camera Resolution</h3>
                          <p className="text-sm text-gray-500">Quality of AR camera feed</p>
                        </div>
                      </div>
                      <Select 
                        value={settings.cameraResolution}
                        onValueChange={(value) => updateSetting('cameraResolution', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Resolution" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* WiFi Only */}
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Wifi className="h-5 w-5 text-purple-500 mr-3" />
                        <div>
                          <h3 className="font-medium text-gray-800">Download on WiFi Only</h3>
                          <p className="text-sm text-gray-500">Download repair guides only on WiFi</p>
                        </div>
                      </div>
                      <Switch 
                        checked={settings.downloadGuidesWifiOnly}
                        onCheckedChange={(checked) => updateSetting('downloadGuidesWifiOnly', checked)}
                      />
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Support & Help */}
          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Support & Help</h2>
            </div>
            <div className="divide-y divide-gray-100">
              <Link href="#" className="flex items-center p-4 hover:bg-gray-50">
                <HelpCircle className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Help Center</h3>
                  <p className="text-sm text-gray-500">Get help with the app</p>
                </div>
              </Link>
              <Link href="#" className="flex items-center p-4 hover:bg-gray-50">
                <Upload className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Send Feedback</h3>
                  <p className="text-sm text-gray-500">Help us improve HomeFix AR</p>
                </div>
              </Link>
              <button 
                onClick={resetToDefaults}
                className="w-full flex items-center p-4 hover:bg-gray-50 text-left"
              >
                <Trash2 className="h-5 w-5 text-red-500 mr-3" />
                <div>
                  <h3 className="font-medium text-red-600">Reset to Defaults</h3>
                  <p className="text-sm text-gray-500">Restore factory settings</p>
                </div>
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-500 mb-6">
            <p>HomeFix AR v1.0.0</p>
            <p className="mt-1">© 2025 HomeFix Technologies</p>
            <div className="mt-3 flex justify-center gap-4">
              <Link href="#" className="text-primary-500 hover:underline">Terms</Link>
              <Link href="#" className="text-primary-500 hover:underline">Privacy</Link>
              <Link href="#" className="text-primary-500 hover:underline">Licenses</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation onScan={handleScan} />
    </div>
  );
}