import WeatherApp from "@/components/WeatherApp";
import { getWeatherData } from "@/lib/weather-api";
import { DEFAULT_LOCATION } from "@/lib/constants";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ latitude?: string; longitude?: string; locationName?: string }>;
}) {
  const params = await searchParams;
  
  const latitude = params.latitude ? parseFloat(params.latitude) : DEFAULT_LOCATION.lat;
  const longitude = params.longitude ? parseFloat(params.longitude) : DEFAULT_LOCATION.lon;
  const locationName = params.locationName ? params.locationName : DEFAULT_LOCATION.label;

  const initialWeather = await getWeatherData(latitude, longitude);

  return (
    <main 
      className="text-white"
      role="main"
      aria-label="Weather application main content"
    >
      <WeatherApp initialWeather={initialWeather} locationName={locationName} />
    </main>
  );
}
