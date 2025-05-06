"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

export function LocationInfo() {
  const [temperature, setTemperature] = useState("32°C")
  const [location, setLocation] = useState("Lagos, NG")

  // In a real app, you might fetch this data from a weather API

  return (
    <div className="flex items-center text-sm text-gray-400">
      <span className="mr-2">{temperature}</span>
      <MapPin className="h-4 w-4 mr-1" />
      <span>{location}</span>
    </div>
  )
}
