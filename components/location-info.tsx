"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export function LocationInfo() {
  const [temperature, setTemperature] = useState<string | null>("30");
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLocationAndWeather() {
      try {
        // Get location from IP
        const locRes = await fetch("https://ip-api.com/json/");
        const locData = await locRes.json();
        const city = locData.city;
        const country = locData.countryCode;
        if (city && country) {
          setLocation(`${city}, ${country}`);
        } else {
          setLocation("Unknown location");
        }

        // Get weather from Open-Meteo
        const lat = locData.lat;
        const lon = locData.lon;
        if (lat && lon) {
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
          );
          const weatherData = await weatherRes.json();
          const temp = weatherData.current_weather?.temperature;
          setTemperature(temp !== undefined ? `${Math.round(temp)}°C` : "--°C");
        } else {
          setTemperature("--°C");
        }
      } catch (e) {
        setTemperature("--°C");
        setLocation("Unknown location");
      }
    }
    fetchLocationAndWeather();
  }, []);

  return (
    <div className="flex items-center text-sm bg-background/60 backdrop-blur border border-border rounded px-3 py-1 shadow-lg">
      <span className="mr-2">{temperature ?? "--°C"}</span>
      <MapPin className="h-4 w-4 mr-1" />
      <span>{location ?? "Locating..."}</span>
    </div>
  );
}
