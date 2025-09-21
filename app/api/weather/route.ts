import { NextRequest, NextResponse } from 'next/server';
import { getWeatherData } from '@/lib/weather-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { error: 'Invalid latitude or longitude' },
        { status: 400 }
      );
    }

    const weatherData = await getWeatherData(lat, lon);
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
