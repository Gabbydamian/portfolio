"use client";

import { MapPin, Cloud } from "lucide-react";
import { useLocation } from "@/app/contexts/location-context";

export function LocationInfo() {
  const { temperature, location, loading } = useLocation();

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
