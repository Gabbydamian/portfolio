"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface LocationData {
  city: string;
  country: string;
  lat: number;
  lon: number;
}

interface LocationContextType {
  temperature: string | null;
  location: string | null;
  loading: boolean;
  weatherCondition: string | null;
}

const LocationContext = createContext<LocationContextType>({
  temperature: "--°C",
  location: "Locating...",
  loading: true,
  weatherCondition: null,
});

export function LocationProvider({ children }: { children: ReactNode }) {
  const [temperature, setTemperature] = useState<string | null>("--°C");
  const [location, setLocation] = useState<string | null>("Locating...");
  const [loading, setLoading] = useState(true);
  const [weatherCondition, setWeatherCondition] = useState<string | null>(null);

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
            `https://api.open-meteo.com/v1/forecast?latitude=${locationData.lat}&longitude=${locationData.lon}&current=temperature_2m,weathercode`
          );
          const weatherData = await weatherRes.json();

          const temp = weatherData.current?.temperature_2m;
          const unit = weatherData.current_units?.temperature_2m || "°C";
          const weatherCode = weatherData.current?.weathercode;

          setTemperature(
            temp !== undefined ? `${Math.round(temp)}${unit}` : "--°C"
          );

          // Map weather code to condition
          if (weatherCode !== undefined) {
            const condition = getWeatherCondition(weatherCode);
            setWeatherCondition(condition);
          }
        } catch (e) {
          console.error("Error fetching weather:", e);
          setTemperature("--°C");
          setWeatherCondition(null);
        }
      }

      setLoading(false);
    }
    fetchLocationAndWeather();
  }, []);

  return (
    <LocationContext.Provider
      value={{ temperature, location, loading, weatherCondition }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// Function to map weather codes to conditions
function getWeatherCondition(code: number): string {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (code === 0) return "clear";
  if (code >= 1 && code <= 3) return "cloudy";
  if (code >= 45 && code <= 48) return "foggy";
  if (code >= 51 && code <= 55) return "drizzle";
  if (code >= 56 && code <= 57) return "freezing-drizzle";
  if (code >= 61 && code <= 65) return "rain";
  if (code >= 66 && code <= 67) return "freezing-rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 80 && code <= 82) return "rain-showers";
  if (code >= 85 && code <= 86) return "snow-showers";
  if (code >= 95 && code <= 99) return "thunderstorm";
  return "unknown";
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
