"use client";

import { useEffect, useState } from "react";
import { MapPin, Cloud } from "lucide-react";

export function LocationInfo() {
  const [temperature, setTemperature] = useState<string | null>("--°C");
  const [location, setLocation] = useState<string | null>("Locating...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocationAndWeather() {
      const geoServices = [
        async () => {
          const res = await fetch("https://geolocation-db.com/json/");
          const data = await res.json();
          return {
            city: data.city,
            country: data.country_code,
            lat: data.latitude,
            lon: data.longitude,
          };
        },
        async () => {
          const res = await fetch("https://ipapi.co/json/");
          const data = await res.json();
          return {
            city: data.city,
            country: data.country_code,
            lat: data.latitude,
            lon: data.longitude,
          };
        },
      ];

      let locationData = null;
      for (const service of geoServices) {
        try {
          locationData = await service();
          if (locationData?.city && locationData?.country) {
            break;
          }
        } catch (e) {
          console.log("Service attempt failed, trying next one");
        }
      }

      // Handle location data
      if (locationData?.city && locationData?.country) {
        setLocation(`${locationData.city}, ${locationData.country}`);
      } else {
        setLocation("Location unavailable");
      }

      if (locationData?.lat && locationData?.lon) {
        try {
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${locationData.lat}&longitude=${locationData.lon}&current=temperature_2m`
          );
          const weatherData = await weatherRes.json();

          const temp = weatherData.current?.temperature_2m;
          const unit = weatherData.current_units?.temperature_2m || "°C";

          setTemperature(
            temp !== undefined ? `${Math.round(temp)}${unit}` : "--°C"
          );
        } catch (e) {
          console.error("Error fetching weather:", e);
          setTemperature("--°C");
        }
      }

      setLoading(false);
    }
    fetchLocationAndWeather();
  }, []);

  return (
    <div className="flex items-center text-sm bg-background/60 backdrop-blur border border-border rounded-xl px-3 py-3 shadow-lg">
      {loading ? (
        <span className="text-muted-foreground">Loading...</span>
      ) : (
        <>
          <Cloud className="h-3.5 w-3.5 mr-1 text-sky-400" />
          <span className="mr-2 font-medium">{temperature}</span>
          <span className="mx-1 text-muted-foreground">|</span>
          <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-400" />
          <span>{location}</span>
        </>
      )}
    </div>
  );
}
