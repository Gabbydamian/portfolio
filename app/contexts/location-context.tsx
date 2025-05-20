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
}

const LocationContext = createContext<LocationContextType>({
  temperature: "--°C",
  location: "Locating...",
  loading: true,
});

export function LocationProvider({ children }: { children: ReactNode }) {
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
    <LocationContext.Provider value={{ temperature, location, loading }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
