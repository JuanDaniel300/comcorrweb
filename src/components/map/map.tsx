"use client";
import React, { useRef, useEffect } from "react";

declare global {
  interface Window {
    google?: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: google.maps.MapOptions
        ) => google.maps.Map;
      };
    };
  }
}

interface MapProps {
  apiKey?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  style?: React.CSSProperties;
}

const Map: React.FC<MapProps> = ({
  apiKey = "AIzaSyBT_OJxRIFiquTbKJebS1CNdJ6A5fWxLBU",
  center = { lat: 19.4326, lng: -99.1332 },
  zoom = 12,
  style = { width: "100%", height: "400px" },
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.onload = () => {
        if (mapRef.current) {
          new window.google.maps.Map(mapRef.current, {
            center,
            zoom,
          });
        }
      };
      document.body.appendChild(script);
    } else {
      if (mapRef.current) {
        new window.google.maps.Map(mapRef.current, {
          center,
          zoom,
        });
      }
    }
  }, [apiKey, center, zoom]);

  return <div ref={mapRef} style={style} />;
};

export default Map;
