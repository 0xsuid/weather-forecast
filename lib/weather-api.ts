import { getWeatherCondition } from "@/lib/weather-codes";
import { API_CONFIG, ERROR_MESSAGES } from "@/lib/constants";

export interface HourlyEntry {
  time: string;
  temperature: number;
  code: number;
}

export interface DailyEntry {
  day: string;
  temp: number;
  code: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  hourly: HourlyEntry[];
  daily: DailyEntry[];
}

/**
 * Server-side function to fetch weather data
 * This runs on the server and can be cached
 */
export async function getWeatherData(lat: number, lon: number): Promise<WeatherData> {
  try {
    const res = await fetch(
      `${API_CONFIG.WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,relative_humidity_2m&daily=temperature_2m_max,weathercode&current_weather=true&timezone=auto`,
      {
        // Add caching for better performance
        next: {
          revalidate: 300
        }
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    const currentTime = new Date(data.current_weather.time);
    currentTime.setTime(currentTime.getTime() - currentTime.getTimezoneOffset() * 60000);

    const currentTimeIndex = data.hourly.time.findIndex(
      (x: string) => x.slice(0, 13) === currentTime.toISOString().slice(0, 13)
    );

    if (currentTimeIndex === -1) {
      throw new Error("Unable to determine current time index");
    }

    // Build hourly array starting now
    const hourly: HourlyEntry[] = data.hourly.time
      .slice(currentTimeIndex, currentTimeIndex + API_CONFIG.HOURLY_FORECAST_HOURS)
      .map((time: string, idx: number) => ({
        time: time.slice(11, 16),
        temperature: data.hourly.temperature_2m[currentTimeIndex + idx],
        code: data.hourly.weathercode[currentTimeIndex + idx],
      }));

    const daily: DailyEntry[] = data.daily.time
      .slice(0, API_CONFIG.DAILY_FORECAST_DAYS)
      .map((day: string, idx: number) => ({
        day: new Date(day).toLocaleDateString("en-US", { weekday: "long" }),
        temp: Math.round(data.daily.temperature_2m_max[idx]),
        code: data.daily.weathercode[idx],
      }));

    return {
      temperature: Math.round(data.current_weather.temperature),
      condition: getWeatherCondition(data.current_weather.weathercode ?? 0),
      windSpeed: data.current_weather.windspeed,
      humidity: data.hourly.relative_humidity_2m[currentTimeIndex],
      hourly,
      daily,
    };
  } catch (err) {
    console.error("Weather fetch error:", err);
    throw new Error(err instanceof Error ? err.message : ERROR_MESSAGES.UNKNOWN_ERROR);
  }
}
