import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App - Real-time Weather Forecast",
  description: "Get accurate weather forecasts with beautiful hourly and daily weather data. Search locations worldwide and view current conditions, temperature trends, and detailed weather information.",
  keywords: ["weather", "forecast", "temperature", "climate", "meteorology", "weather app"],
  authors: [{ name: "Weather App" }],
  creator: "Weather App",
  publisher: "Weather App",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://weather-app.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Weather App - Real-time Weather Forecast",
    description: "Get accurate weather forecasts with beautiful hourly and daily weather data.",
    url: "https://weather-app.example.com",
    siteName: "Weather App",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather App - Real-time Weather Forecast",
    description: "Get accurate weather forecasts with beautiful hourly and daily weather data.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#2A9D8F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
