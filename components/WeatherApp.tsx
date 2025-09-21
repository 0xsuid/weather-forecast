import React from "react";
import WeatherDisplay from "./WeatherDisplay";
import WeatherForecast from "./WeatherForecast";
import TemperatureChart from "./TemperatureChart";
import { WeatherData } from "@/lib/weather-api";
import WeatherSearch from "./WeatherSearch";

interface WeatherAppProps {
  initialWeather: WeatherData;
  locationName: string;
}

export default function WeatherApp({ initialWeather, locationName }: WeatherAppProps) {
  // Convert weather data to chart format
  const chartData = initialWeather.hourly.map((hour, idx) => ({
    time: hour.time,
    temp: Math.round(hour.temperature),
    code: hour.code,
    current: idx === 0,
  }));

  return (
    <div>
      <div className="container mx-auto px-6 py-8 relative">
        {/* Location Search - Small Client Component for interactivity */}
        <WeatherSearch locationName={locationName} />

        {/* Weather Content - Server-rendered static content */}
        {/* Current Weather Display */}
        <WeatherDisplay weather={initialWeather} />

        {/* Hourly Forecast Chart */}
        <div className="mt-12">
          <TemperatureChart data={chartData} />
        </div>

        {/* Daily Forecast */}
        <WeatherForecast daily={initialWeather.daily} />
      </div>
    </div>
  );
}
