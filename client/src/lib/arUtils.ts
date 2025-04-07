import { AR_SETTINGS } from './constants';

// Define types for AR markers
interface ARMarker {
  id: string;
  label: string;
  position: {
    x: number;
    y: number;
    z?: number;
  };
  size?: number;
}

// Detection result interface
interface DetectionResult {
  success: boolean;
  appliance?: {
    id: number;
    name: string;
    brand: string;
    model: string;
    type: string;
  };
  error?: string;
}

/**
 * Initialize the AR scene with A-Frame and AR.js
 * This sets up the AR camera and detection system
 */
export async function initializeARScene(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Add a safety check to ensure the browser supports mediaDevices
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Browser does not support camera access needed for AR');
        reject(new Error('Browser does not support camera access needed for AR'));
        return;
      }
      
      // Request camera permission explicitly, using only video
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Prefer back camera if available
        }, 
        audio: false 
      })
      .then(() => {
        console.log('Camera permission granted, AR scene initialized');
        
        // In a real implementation, this would initialize AR.js and set up event listeners
        // For demo purposes, we'll just wait a moment to simulate initialization
        setTimeout(() => {
          resolve();
        }, 1000);
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error initializing AR scene:', error);
      reject(error);
    }
  });
}

/**
 * Detect an appliance using AR.js
 * In a real implementation, this would use image recognition to identify the appliance
 */
export async function detectAppliance(): Promise<DetectionResult> {
  return new Promise((resolve) => {
    // In a real implementation, this would use AR.js to detect an appliance
    // For demo purposes, we'll simulate a successful detection after a delay
    setTimeout(() => {
      resolve({
        success: true,
        appliance: {
          id: 1,
          name: 'Samsung Washer WF45R6100',
          brand: 'Samsung',
          model: 'WF45R6100',
          type: 'washing_machine'
        }
      });
    }, 2000);
  });
}

/**
 * Create AR markers for repair steps
 * In a real implementation, this would create A-Frame entities for AR markers
 */
export function createARMarkers(markers: ARMarker[]): void {
  // In a real implementation, this would create A-Frame entities for the markers
  console.log('Creating AR markers:', markers);
  
  markers.forEach(marker => {
    // This would create A-Frame entities in a real implementation
    console.log(`Created marker: ${marker.id} at position (${marker.position.x}, ${marker.position.y})`);
  });
}

/**
 * Update AR marker positions
 * In a real implementation, this would update the positions of AR markers
 */
export function updateARMarkerPositions(markers: ARMarker[]): void {
  // In a real implementation, this would update A-Frame entities
  console.log('Updating AR marker positions:', markers);
}

/**
 * Highlight an AR marker
 * In a real implementation, this would change the appearance of an AR marker
 */
export function highlightARMarker(markerId: string): void {
  // In a real implementation, this would highlight the specified marker
  console.log(`Highlighting marker: ${markerId}`);
}

/**
 * Clean up AR resources
 * This properly removes AR markers and cleans up camera resources
 */
export function cleanupARResources(): void {
  console.log('Cleaning up AR resources');
  
  // Get the AR scene element
  const arScene = document.getElementById('ar-scene');
  
  // If the scene exists, handle cleanup
  if (arScene) {
    // Remove the scene completely to stop camera
    if (arScene.parentNode) {
      arScene.parentNode.removeChild(arScene);
    }
    
    // Get all video elements that might be created by AR.js
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
      // Stop all video tracks
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => {
            track.stop(); // Stop each track
          });
        }
        video.srcObject = null; // Clear the source
      }
      
      // Remove the video element
      if (video.parentNode) {
        video.parentNode.removeChild(video);
      }
    });
    
    // Clean up canvas elements created by AR.js
    const canvasElements = document.querySelectorAll('canvas');
    canvasElements.forEach(canvas => {
      if (canvas.parentNode && canvas.hasAttribute('data-aframe-canvas')) {
        canvas.parentNode.removeChild(canvas);
      }
    });
  }
}

/**
 * Get screen coordinates from world position
 * Useful for placing UI elements at the same position as AR markers
 */
export function getScreenCoordinatesFromWorldPosition(
  position: { x: number; y: number; z: number }
): { x: number; y: number } {
  // In a real implementation, this would convert 3D coordinates to screen coordinates
  // For demo purposes, we'll just return the x and y values scaled to percentage of screen
  return {
    x: position.x * window.innerWidth,
    y: position.y * window.innerHeight
  };
}

/**
 * Check if the device supports AR
 * In a real implementation, this would check for AR.js compatibility
 */
export function checkARSupport(): boolean {
  // In a real implementation, this would check if the device supports AR.js
  // For demo purposes, we'll just return true
  return true;
}
