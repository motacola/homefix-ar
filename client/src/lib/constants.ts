// Appliance types
export const APPLIANCE_TYPES = {
  WASHING_MACHINE: 'washing_machine',
  REFRIGERATOR: 'refrigerator',
  DISHWASHER: 'dishwasher',
  MICROWAVE: 'microwave',
  DRYER: 'dryer',
  OVEN: 'oven',
  STOVE: 'stove'
};

// Repair difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  MEDIUM: 'medium',
  ADVANCED: 'advanced'
};

// AR detection settings
export const AR_SETTINGS = {
  DETECTION_CONFIDENCE: 0.75,
  MARKER_SIZE: 50,
  HIGHLIGHT_COLOR: '#3B82F6',
  WARNING_COLOR: '#EF4444'
};

// App user settings
export const DEFAULT_USER_SETTINGS = {
  SKILL_LEVEL: DIFFICULTY_LEVELS.BEGINNER,
  SHOW_SAFETY_WARNINGS: true,
  USE_AR_WHEN_AVAILABLE: true,
  SOUND_ENABLED: true,
  DOWNLOAD_GUIDES_WIFI_ONLY: true,
  THEME: 'light',
  LANGUAGE: 'english',
  CAMERA_RESOLUTION: 'high',
  NOTIFICATIONS: true,
  DATA_USAGE: 'balanced'
};

// Theme options
export const THEME_OPTIONS = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Languages
export const LANGUAGE_OPTIONS = {
  ENGLISH: 'english',
  SPANISH: 'spanish',
  FRENCH: 'french',
  GERMAN: 'german'
};

// Camera resolution options
export const CAMERA_RESOLUTION = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Data usage options
export const DATA_USAGE = {
  LOW: 'low',
  BALANCED: 'balanced',
  HIGH: 'high'
};

// API endpoints
export const API_ENDPOINTS = {
  APPLIANCES: '/api/appliances',
  REPAIRS: '/api/repairs',
  REPAIR_HISTORY: '/api/history',
  POPULAR_REPAIRS: '/api/repairs/popular'
};

// Safety messages
export const SAFETY_MESSAGES = {
  ELECTRICAL: 'Always unplug appliance before working on electrical components.',
  WATER: 'Shut off water supply before working on water connections.',
  SHARP: 'Be careful of sharp edges. Consider wearing gloves.',
  GAS: 'Turn off gas supply and ensure proper ventilation.',
  HEAVY: 'Get assistance when moving heavy components.'
};

// iFixit integration settings
export const IFIXIT_SETTINGS = {
  BASE_URL: 'https://www.ifixit.com/api/2.0',
  GUIDE_URL: 'https://www.ifixit.com/Guide'
};
