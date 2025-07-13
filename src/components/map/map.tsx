"use client";

import React, { useRef, useEffect, useState } from "react";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  style?: React.CSSProperties;
  onMapLoad?: (map: google.maps.Map) => void;
}

// Espera a que Google Maps esté disponible
const waitForGoogleMaps = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;

    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        clearInterval(interval);
        resolve();
      }
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      reject("Google Maps script load timeout");
    }, 10000);
  });
};

const GoogleMap: React.FC<MapProps> = ({
  center = { lat: 19.4326, lng: -99.1332 },
  zoom = 12,
  style = { width: "100%", height: "100%" },
  onMapLoad,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    waitForGoogleMaps()
      .then(() => setIsMapReady(true))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (isMapReady && mapRef.current && !mapInstance.current) {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      onMapLoad?.(mapInstance.current);
    }
  }, [isMapReady, center, zoom, onMapLoad]);

  return <div ref={mapRef} style={style} />;
};

export default GoogleMap;
