"use client";

import {
  MapPin,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  CloudFog,
} from "lucide-react";
import { useLocation } from "@/app/contexts/location-context";

export function LocationInfo() {
  const { temperature, location, loading, weatherCondition } = useLocation();

  const getWeatherIcon = () => {
    if (!weatherCondition)
      return <Cloud className="h-3.5 w-3.5 mr-1 text-sky-400" />;

    switch (weatherCondition) {
      case "clear":
        return <Sun className="h-3.5 w-3.5 mr-1 text-yellow-400" />;
      case "cloudy":
        return <Cloud className="h-3.5 w-3.5 mr-1 text-sky-400" />;
      case "foggy":
        return <CloudFog className="h-3.5 w-3.5 mr-1 text-gray-400" />;
      case "drizzle":
      case "rain":
      case "rain-showers":
        return <CloudRain className="h-3.5 w-3.5 mr-1 text-blue-400" />;
      case "snow":
      case "snow-showers":
      case "freezing-drizzle":
      case "freezing-rain":
        return <CloudSnow className="h-3.5 w-3.5 mr-1 text-blue-200" />;
      case "thunderstorm":
        return <CloudLightning className="h-3.5 w-3.5 mr-1 text-yellow-500" />;
      default:
        return <Cloud className="h-3.5 w-3.5 mr-1 text-sky-400" />;
    }
  };

  return (
    <div className="flex items-center text-sm bg-background/60 backdrop-blur border border-border rounded-xl px-3 py-3 shadow-lg">
      {loading ? (
        <span className="text-muted-foreground">Loading...</span>
      ) : (
        <>
          {getWeatherIcon()}
          <span className="mr-2 font-medium">{temperature}</span>
          <span className="mx-1 text-muted-foreground">|</span>
          <MapPin className="h-3.5 w-3.5 mr-1 text-emerald-400" />
          <span>{location}</span>
        </>
      )}
    </div>
  );
}
