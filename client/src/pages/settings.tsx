import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { DEFAULT_USER_SETTINGS } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertCircle, 
  ArrowLeft, 
  BellRing,
  Volume2, 
  Wifi, 
  Shield, 
  HelpCircle 
} from "lucide-react";
import { Link } from "wouter";

export default function Settings() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    skillLevel: DEFAULT_USER_SETTINGS.SKILL_LEVEL,
    showSafetyWarnings: DEFAULT_USER_SETTINGS.SHOW_SAFETY_WARNINGS,
    useArWhenAvailable: DEFAULT_USER_SETTINGS.USE_AR_WHEN_AVAILABLE,
    soundEnabled: DEFAULT_USER_SETTINGS.SOUND_ENABLED,
    downloadGuidesWifiOnly: DEFAULT_USER_SETTINGS.DOWNLOAD_GUIDES_WIFI_ONLY
  });

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleScan = () => {
    // This is just a placeholder - would be implemented in a real app
    console.log("Scan button clicked");
  };

  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* App Header */}
      <Header userMenuOpen={userMenuOpen} toggleUserMenu={toggleUserMenu} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          </div>

          {/* Support Options */}
          <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Support</h2>
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
                <BellRing className="h-5 w-5 text-gray-500 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Contact Support</h3>
                  <p className="text-sm text-gray-500">Email our support team</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-6 mb-4 text-center text-sm text-gray-500">
            <p>HomeFix AR v1.0.0</p>
            <p className="mt-1">© 2025 HomeFix Technologies</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation onScan={handleScan} />
    </div>
  );
}