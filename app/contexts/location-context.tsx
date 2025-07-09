"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";

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

const getWeatherCondition = (() => {
  const lookup: Record<number, string> = {
    0: "clear",
    1: "cloudy",
    2: "cloudy",
    3: "cloudy",
    45: "foggy",
    46: "foggy",
    47: "foggy",
    48: "foggy",
    51: "drizzle",
    52: "drizzle",
    53: "drizzle",
    54: "drizzle",
    55: "drizzle",
    56: "freezing-drizzle",
    57: "freezing-drizzle",
    61: "rain",
    62: "rain",
    63: "rain",
    64: "rain",
    65: "rain",
    66: "freezing-rain",
    67: "freezing-rain",
    71: "snow",
    72: "snow",
    73: "snow",
    74: "snow",
    75: "snow",
    76: "snow",
    77: "snow",
    80: "rain-showers",
    81: "rain-showers",
    82: "rain-showers",
    85: "snow-showers",
    86: "snow-showers",
    95: "thunderstorm",
    96: "thunderstorm",
    97: "thunderstorm",
    98: "thunderstorm",
    99: "thunderstorm",
  };
  return (code: number) => lookup[code] || "unknown";
})();

async function fetchLocationAndWeather() {
  let locationData = null;
  try {
    const res = await fetch("https://ipapi.co/json/").then((res) => res.json());
    // console.log("ipapi.co response:", res);
    if (res.city && res.country_code) {
      locationData = {
        city: res.city,
        country: res.country_code,
        lat: res.latitude,
        lon: res.longitude,
      };
    }
  } catch (e) {
    console.log("ipapi.co failed:", e);
  }
  let location =
    locationData && locationData.city && locationData.country
      ? `${locationData.city}, ${locationData.country}`
      : "Location unavailable";
  let temperature = "--°C";
  let weatherCondition = null;
  if (locationData && locationData.lat && locationData.lon) {
    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${locationData.lat}&longitude=${locationData.lon}&current=temperature_2m,weathercode`
      );
      const weatherData = await weatherRes.json();
      const temp = weatherData.current?.temperature_2m;
      const unit = weatherData.current_units?.temperature_2m || "°C";
      const weatherCode = weatherData.current?.weathercode;
      temperature = temp !== undefined ? `${Math.round(temp)}${unit}` : "--°C";
      weatherCondition =
        weatherCode !== undefined ? getWeatherCondition(weatherCode) : null;
    } catch {
      temperature = "--°C";
      weatherCondition = null;
    }
  }
  return {
    temperature,
    location,
    weatherCondition,
    loading: false,
  };
}

export function LocationProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useQuery({
    queryKey: ["location-weather"],
    queryFn: fetchLocationAndWeather,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
  // Batch state: provide all at once
  return (
    <LocationContext.Provider
      value={{
        temperature: data?.temperature ?? "--°C",
        location: data?.location ?? "Locating...",
        loading: isLoading || !!data?.loading,
        weatherCondition: data?.weatherCondition ?? null,
      }}
    >
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
