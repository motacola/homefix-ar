import { useState, useCallback } from 'react';
import { initializeARScene, detectAppliance } from '@/lib/arUtils';

type DetectionStatus = 'idle' | 'scanning' | 'detected' | 'error';

export function useARDetection() {
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>('idle');
  const [detectedAppliance, setDetectedAppliance] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startDetection = useCallback(async () => {
    try {
      setDetectionStatus('scanning');
      setError(null);

      // In a real implementation, this would initialize the AR scene
      // and start the detection process
      await initializeARScene();
      
      // For demonstration purposes, we'll simulate the detection process
      // In a real application, this would use the camera to detect appliances
      const result = await detectAppliance();
      
      if (result.success) {
        setDetectedAppliance(result.appliance);
        setDetectionStatus('detected');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setDetectionStatus('error');
    }
  }, []);

  const stopDetection = useCallback(() => {
    // Stop the AR detection and clean up resources
    setDetectionStatus('idle');
    setDetectedAppliance(null);
    
    // This will be handled by cleanupARResources, but we'll add an additional check here
    // to make sure all camera tracks are stopped
    try {
      const videoElements = document.querySelectorAll('video');
      videoElements.forEach(video => {
        if (video.srcObject) {
          const stream = video.srcObject as MediaStream;
          if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => {
              track.stop();
            });
          }
          video.srcObject = null;
        }
      });
    } catch (error) {
      console.error('Error stopping camera:', error);
    }
  }, []);

  return {
    startDetection,
    stopDetection,
    detectionStatus,
    detectedAppliance,
    error
  };
}
