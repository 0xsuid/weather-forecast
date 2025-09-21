import React from "react";
import {
  Sun,
  Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail,
  CloudSunRain,
  Eye,
  Zap,
  Wind,
  Tornado,
} from "lucide-react";
import { getWeatherIconName, getIconProps } from "@/lib/weather-codes";

// Icon components mapping
const iconComponents = {
  Sun,
  Cloud,
  Cloudy: Cloud,
  CloudSun,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudHail,
  CloudSunRain,
  Eye,
  Zap,
  Wind,
  Tornado,
} as const;

export interface WeatherIconProps {
  code: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * WeatherIcon component - renders appropriate weather icon based on WMO code
 * @param code - WMO weather code (0-99)
 * @param size - Icon size in pixels (default: 20)
 * @param strokeWidth - Icon stroke width (default: 2)
 * @param className - Additional CSS classes
 */
export const WeatherIcon: React.FC<WeatherIconProps> = ({
  code,
  size = 20,
  strokeWidth = 2,
  className = "",
}) => {
  const iconName = getWeatherIconName(code);
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || iconComponents.Cloud;
  const props = getIconProps(code, size, true);
  
  return (
    <IconComponent
      size={size}
      color={props.color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};

export default WeatherIcon;
