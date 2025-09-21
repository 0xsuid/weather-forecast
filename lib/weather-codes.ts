// WMO Weather Codes Reference (for documentation)
// 0-3: Clear sky codes
// 4-19: Atmospheric conditions  
// 20-29: Recent weather
// 30-39: Duststorm, sandstorm, blowing snow
// 40-49: Fog
// 50-59: Drizzle
// 60-69: Rain
// 70-79: Snow
// 80-89: Showers
// 90-99: Thunderstorm

/**
 * Get human-readable weather condition from WMO code
 * @param code - WMO weather code (0-99)
 * @returns Weather condition string
 */
export const getWeatherCondition = (code: number): string => {
  return getWeatherIconConfig(code).description;
};

/**
 * Weather icon mapping with detailed configuration
 */
export interface WeatherIconConfig {
  icon: string;
  color?: string;
  description: string;
}

/**
 * Comprehensive weather icon mappings (WMO Standard) - Monument Valley 2 Theme
 */
export const WEATHER_ICON_MAP: Record<number, WeatherIconConfig> = {
  // Clear sky codes (0-3)
  0: { icon: "Sun", color: "#E9C46A", description: "Clear sky" },
  1: { icon: "CloudSun", color: "#E9C46A", description: "Mainly clear" },
  2: { icon: "CloudSunRain", color: "#F4A261", description: "Partly cloudy" },
  3: { icon: "Cloudy", color: "#FFFFFF", description: "Overcast" },
  
  // Atmospheric visibility issues (4-19)
  4: { icon: "Eye", color: "#F4A261", description: "Smoke visibility" },
  5: { icon: "Eye", color: "#F4A261", description: "Haze" },
  6: { icon: "Eye", color: "#F4A261", description: "Dust suspension" },
  7: { icon: "Eye", color: "#F4A261", description: "Dust/sand by wind" },
  8: { icon: "Eye", color: "#F4A261", description: "Dust whirls" },
  9: { icon: "Eye", color: "#F4A261", description: "Duststorm in sight" },
  10: { icon: "CloudFog", color: "#FFFFFF", description: "Mist" },
  11: { icon: "CloudFog", color: "#FFFFFF", description: "Shallow fog patches" },
  12: { icon: "CloudFog", color: "#FFFFFF", description: "Continuous shallow fog" },
  13: { icon: "Zap", color: "#E76F51", description: "Lightning visible" },
  14: { icon: "CloudRain", color: "#FFFFFF", description: "Precipitation in sight" },
  15: { icon: "CloudRain", color: "#FFFFFF", description: "Distant precipitation" },
  16: { icon: "CloudRain", color: "#FFFFFF", description: "Near precipitation" },
  17: { icon: "CloudLightning", color: "#E76F51", description: "Thunderstorm no precip" },
  18: { icon: "Wind", color: "#F4A261", description: "Squalls" },
  19: { icon: "Tornado", color: "#E76F51", description: "Funnel cloud" },
  
  // Recent weather (20-29)
  20: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Recent drizzle" },
  21: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Recent rain" },
  22: { icon: "CloudSnow", color: "#FFFFFF", description: "Recent snow" },
  23: { icon: "CloudSnow", color: "#FFFFFF", description: "Recent rain/snow" },
  24: { icon: "CloudRain", color: "#FFFFFF", description: "Recent freezing rain" },
  25: { icon: "CloudRain", color: "#FFFFFF", description: "Recent rain shower" },
  26: { icon: "CloudRain", color: "#FFFFFF", description: "Recent snow shower" },
  27: { icon: "CloudRain", color: "#FFFFFF", description: "Recent hail shower" },
  28: { icon: "CloudFog", color: "#FFFFFF", description: "Recent fog" },
  29: { icon: "CloudLightning", color: "#E76F51", description: "Recent thunderstorm" },
  
  // Dust/sand storms (30-39)
  30: { icon: "Wind", color: "#F4A261", description: "Slight duststorm" },
  31: { icon: "Wind", color: "#F4A261", description: "Moderate duststorm" },
  32: { icon: "Wind", color: "#F4A261", description: "Increasing duststorm" },
  33: { icon: "Wind", color: "#E76F51", description: "Severe duststorm" },
  34: { icon: "Wind", color: "#E76F51", description: "Severe duststorm steady" },
  35: { icon: "Wind", color: "#E76F51", description: "Severe duststorm increasing" },
  36: { icon: "CloudSnow", color: "#FFFFFF", description: "Slight blowing snow" },
  37: { icon: "CloudSnow", color: "#FFFFFF", description: "Heavy drifting snow" },
  38: { icon: "CloudSnow", color: "#FFFFFF", description: "Moderate blowing snow" },
  39: { icon: "CloudSnow", color: "#FFFFFF", description: "Heavy drifting snow high" },
  
  // Fog codes (40-49)
  40: { icon: "CloudFog", color: "#FFFFFF", description: "Fog at distance" },
  41: { icon: "CloudFog", color: "#FFFFFF", description: "Fog patches" },
  42: { icon: "CloudFog", color: "#FFFFFF", description: "Fog thinning" },
  43: { icon: "CloudFog", color: "#FFFFFF", description: "Fog thinning invisible" },
  44: { icon: "CloudFog", color: "#FFFFFF", description: "Fog steady" },
  45: { icon: "CloudFog", color: "#FFFFFF", description: "Fog steady invisible" },
  46: { icon: "CloudFog", color: "#FFFFFF", description: "Fog thickening" },
  47: { icon: "CloudFog", color: "#FFFFFF", description: "Fog thickening invisible" },
  48: { icon: "CloudFog", color: "#FFFFFF", description: "Fog with rime" },
  49: { icon: "CloudFog", color: "#FFFFFF", description: "Fog with rime invisible" },
  
  // Drizzle codes (50-59)
  50: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Slight drizzle" },
  51: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Continuous slight drizzle" },
  52: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Moderate drizzle" },
  53: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Continuous moderate drizzle" },
  54: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Heavy drizzle" },
  55: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Continuous heavy drizzle" },
  56: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Slight freezing drizzle" },
  57: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Heavy freezing drizzle" },
  58: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Drizzle and rain" },
  59: { icon: "CloudDrizzle", color: "#FFFFFF", description: "Heavy drizzle and rain" },
  
  // Rain codes (60-69)
  60: { icon: "CloudRain", color: "#FFFFFF", description: "Slight rain" },
  61: { icon: "CloudRain", color: "#FFFFFF", description: "Continuous slight rain" },
  62: { icon: "CloudRain", color: "#FFFFFF", description: "Moderate rain" },
  63: { icon: "CloudRain", color: "#FFFFFF", description: "Continuous moderate rain" },
  64: { icon: "CloudRain", color: "#FFFFFF", description: "Heavy rain" },
  65: { icon: "CloudRain", color: "#FFFFFF", description: "Continuous heavy rain" },
  66: { icon: "CloudHail", color: "#FFFFFF", description: "Slight freezing rain" },
  67: { icon: "CloudHail", color: "#FFFFFF", description: "Heavy freezing rain" },
  68: { icon: "CloudSnow", color: "#FFFFFF", description: "Rain and snow slight" },
  69: { icon: "CloudSnow", color: "#FFFFFF", description: "Rain and snow heavy" },
  
  // Snow codes (70-79)
  70: { icon: "CloudSnow", color: "#FFFFFF", description: "Slight snow" },
  71: { icon: "CloudSnow", color: "#FFFFFF", description: "Continuous slight snow" },
  72: { icon: "CloudSnow", color: "#FFFFFF", description: "Moderate snow" },
  73: { icon: "CloudSnow", color: "#FFFFFF", description: "Continuous moderate snow" },
  74: { icon: "CloudSnow", color: "#FFFFFF", description: "Heavy snow" },
  75: { icon: "CloudSnow", color: "#FFFFFF", description: "Continuous heavy snow" },
  76: { icon: "Snowflake", color: "#E9C46A", description: "Diamond dust" },
  77: { icon: "Snowflake", color: "#FFFFFF", description: "Snow grains" },
  78: { icon: "Snowflake", color: "#E9C46A", description: "Snow crystals" },
  79: { icon: "CloudHail", color: "#FFFFFF", description: "Ice pellets" },
  
  // Shower codes (80-90)
  80: { icon: "CloudRain", color: "#FFFFFF", description: "Slight rain shower" },
  81: { icon: "CloudRain", color: "#FFFFFF", description: "Heavy rain shower" },
  82: { icon: "CloudRain", color: "#E76F51", description: "Violent rain shower" },
  83: { icon: "CloudSnow", color: "#FFFFFF", description: "Slight mixed shower" },
  84: { icon: "CloudSnow", color: "#FFFFFF", description: "Heavy mixed shower" },
  85: { icon: "CloudSnow", color: "#FFFFFF", description: "Slight snow shower" },
  86: { icon: "CloudSnow", color: "#FFFFFF", description: "Heavy snow shower" },
  87: { icon: "CloudHail", color: "#FFFFFF", description: "Slight hail shower" },
  88: { icon: "CloudHail", color: "#FFFFFF", description: "Heavy hail shower" },
  89: { icon: "CloudHail", color: "#FFFFFF", description: "Slight hail shower" },
  90: { icon: "CloudHail", color: "#FFFFFF", description: "Heavy hail shower" },
  
  // Thunderstorm codes (91-99)
  91: { icon: "CloudLightning", color: "#E76F51", description: "Recent thunderstorm slight rain" },
  92: { icon: "CloudLightning", color: "#E76F51", description: "Recent thunderstorm heavy rain" },
  93: { icon: "CloudLightning", color: "#E76F51", description: "Recent thunderstorm slight mixed" },
  94: { icon: "CloudLightning", color: "#E76F51", description: "Recent thunderstorm heavy mixed" },
  95: { icon: "CloudLightning", color: "#E76F51", description: "Thunderstorm without hail" },
  96: { icon: "CloudLightning", color: "#E76F51", description: "Thunderstorm with slight hail" },
  97: { icon: "CloudLightning", color: "#E76F51", description: "Heavy thunderstorm" },
  98: { icon: "CloudLightning", color: "#E76F51", description: "Thunderstorm with duststorm" },
  99: { icon: "CloudLightning", color: "#E76F51", description: "Thunderstorm with heavy hail" },
};

/**
 * Get weather icon configuration from WMO code
 * @param code - WMO weather code (0-99)
 * @returns Icon configuration with name, color, and description
 */
export const getWeatherIconConfig = (code: number): WeatherIconConfig => {
  return WEATHER_ICON_MAP[code] || { 
    icon: "Cloud", 
    color: "#FFFFFF", 
    description: "Unknown weather condition" 
  };
};

/**
 * Get weather icon name from WMO code (simple version)
 * @param code - WMO weather code (0-99)
 * @returns Lucide icon name as string
 */
export const getWeatherIconName = (code: number): string => {
  return getWeatherIconConfig(code).icon;
};

/**
 * Get weather icon color from WMO code
 * @param code - WMO weather code (0-99)
 * @returns Hex color string
 */
export const getWeatherIconColor = (code: number): string => {
  return getWeatherIconConfig(code).color || "#FFFFFF";
};

/**
 * Get icon props for weather components
 * @param code - WMO weather code
 * @param size - Icon size in pixels
 * @param includeColor - Whether to include color prop
 * @returns Object with className and optional color
 */
export const getIconProps = (
  code: number, 
  size: number = 20,
  includeColor: boolean = false
) => {
  const config = getWeatherIconConfig(code);
  const props: { size?: number; color?: string } = {};
  
  // Pass size as a direct prop
  props.size = size;
  
  if (includeColor && config.color) {
    props.color = config.color;
  }
  
  return props;
};