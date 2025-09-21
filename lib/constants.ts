// API Configuration
export const API_CONFIG = {
  WEATHER_BASE_URL: "https://api.open-meteo.com/v1/forecast",
  GEOCODING_BASE_URL: "https://geocoding-api.open-meteo.com/v1/search",
  DEBOUNCE_DELAY: 300,
  HOURLY_FORECAST_HOURS: 10,
  DAILY_FORECAST_DAYS: 5,
  MAX_SUGGESTIONS: 5,
} as const;

// Default Location
export const DEFAULT_LOCATION = {
  lat: 50.3536,
  lon: 7.5788,
  label: "Koblenz, Rheinland-Pfalz, Germany",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  LOCATION_NOT_FOUND: "Location not found. Please try a different search term.",
  FETCH_ERROR: "Failed to fetch weather data. Please check your connection and try again.",
  GEOCODING_ERROR: "Failed to search for locations. Please try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const;
