import React from "react";
import { Wind, CloudRain } from "lucide-react";
import WeatherIcon from "./WeatherIcon";

interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  hourly: Array<{ code: number }>;
}

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="flex items-start justify-between mt-8">
      <div>
        <div className="flex items-start">
          <span className="text-7xl font-thin text-white" aria-label={`Temperature ${weather.temperature} degrees Celsius`}>
            {weather.temperature}
          </span>
          <span className="text-xl font-normal mt-2 ml-1 text-white" aria-label="degrees Celsius">
            °C
          </span>
        </div>
        <div className="text-base font-light mt-2">
          <h2 className="text-2xl text-white" aria-label={`Weather condition: ${weather.condition}`}>
            {weather.condition}
          </h2>
        </div>
        <div className="flex gap-8 mt-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-white/80" aria-hidden="true" />
              <span className="text-thin text-white/80">Wind</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl text-white" aria-label={`Wind speed ${weather.windSpeed} kilometers per hour`}>
                {weather.windSpeed}km/h
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <CloudRain className="w-4 h-4 text-white/80" aria-hidden="true" />
              <span className="text-thin text-white/80">Humidity</span>
            </div>
            <div className="flex items-end gap-1">
              <span className="text-2xl text-white" aria-label={`Humidity ${weather.humidity} percent`}>
                {weather.humidity}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center" aria-hidden="true">
        <WeatherIcon code={weather.hourly[0]?.code ?? 0} size={80} strokeWidth={1} />
      </div>
    </div>
  );
};

export default WeatherDisplay;
