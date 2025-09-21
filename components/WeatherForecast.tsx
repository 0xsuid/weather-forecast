import React from "react";
import WeatherIcon from "./WeatherIcon";

interface DailyEntry {
  day: string;
  temp: number;
  code: number;
}

interface WeatherForecastProps {
  daily: DailyEntry[];
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ daily }) => {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-light mb-4 text-white">Daily Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4" role="list" aria-label="Daily weather forecast">
        {daily.map((day, idx) => (
          <div
            key={`${day.day}-${idx}`}
            className="p-6 bg-white/10 rounded-2xl flex flex-col items-center text-center backdrop-blur-lg border border-white/20 shadow-lg"
            role="listitem"
            aria-label={`${day.day}: ${day.temp} degrees, weather code ${day.code}`}
          >
            <div className="text-sm font-medium whitespace-nowrap text-white">
              {day.day}
            </div>
            <div className="my-1 flex items-center justify-center" aria-hidden="true">
              <WeatherIcon code={day.code} size={25} strokeWidth={1} />
            </div>
            <div className="flex items-start justify-center">
              <span className="text-sm font-thin text-white" aria-label={`Temperature ${day.temp} degrees`}>
                {day.temp}
              </span>
              <span className="text-xs font-normal ml-0.5 text-white/70" aria-label="degrees">
                °
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
