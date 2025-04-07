import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-primary-600 flex flex-col items-center justify-center z-50">
      <div className="flex items-center mb-6">
        <i className="fas fa-tools text-white text-5xl mr-4"></i>
        <h1 className="text-4xl font-bold text-white">HomeFix AR</h1>
      </div>
      <p className="text-xl text-white mb-8">Repair. Learn. Save.</p>
      <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${progress}%` }}>
        </div>
      </div>
    </div>
  );
}
