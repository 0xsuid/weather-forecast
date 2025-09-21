# Weather Forecast

A simple weather forecast website I built to learn Next.js 15 and explore the new App Router. It shows current weather, hourly forecasts, and lets you search for different locations. Nothing fancy, just a clean interface that works well on mobile and desktop.

## What it does

- Shows current weather conditions and temperature
- Displays hourly temperature chart for the next 24 hours  
- Shows 5-day daily forecast
- Search for any location worldwide with autocomplete
- Responsive design that works on phones and tablets

## Built with

- Next.js 15 (App Router) - wanted to try the latest features
- TypeScript - for better development experience
- Tailwind CSS - for styling, makes responsive design easier
- shadcn/ui - for some basic components like inputs and cards
- Recharts - for the temperature chart
- Open-Meteo API - free weather data, no API key needed

## Setup

```bash
# Clone and install
git clone https://github.com/0xsuid/weather-forecast
cd weather-forecast
pnpm install

# Run locally
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```
app/              # Next.js pages
├── page.tsx      # Main page (server component)
├── layout.tsx    # Root layout
└── globals.css   # Styles

components/                # React components  
├── WeatherApp.tsx         # Main app (server component)
├── WeatherSearch.tsx      # Search input (client component)
├── WeatherDisplay.tsx     # Current weather
├── TemperatureChart.tsx   # Chart
...
└── ui/                    # shadcn/ui components

lib/                   # Utilities
├── weather-api.ts     # API calls
└── weather-codes.ts   # Weather icons
```

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/0xsuid/weather-forecast)
