"use client";

import React, { useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

interface LocationSearchInputProps {
    onSelect: (placeData: {
        calle: string;
        numero: string;
        colonia: string;
        ciudad: string;
        estado: string;
        codigo_postal: string;
        latitud: number;
        longitud: number;
    }) => void;
}

const libraries: ("places")[] = ["places"];

const LocationSearchInput: React.FC<LocationSearchInputProps> = ({ onSelect }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_GOOGLE as string,
        libraries,
    });

    useEffect(() => {
        if (!isLoaded || !inputRef.current || !window.google) return;

        const bounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(16.9, -94.5),
            new window.google.maps.LatLng(18.9, -91.0)
        );

        const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: [],
            componentRestrictions: { country: "mx" },
            bounds,
            strictBounds: false,
        });

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            const components = place.address_components;

            if (!place.geometry || !components) return;

            const getComponent = (types: string[]) =>
                components.find((c) => types.some((t) => c.types.includes(t)))?.long_name || "";

            const calle = getComponent(["route"]);
            const numero = getComponent(["street_number"]);
            const colonia = getComponent(["sublocality_level_1", "neighborhood", "political"]);
            const ciudad = getComponent(["locality", "administrative_area_level_2"]);
            const estado = getComponent(["administrative_area_level_1"]);
            const codigo_postal = getComponent(["postal_code"]);
            const latitud = place.geometry.location?.lat() ?? 0;
            const longitud = place.geometry.location?.lng() ?? 0;

            onSelect({
                calle,
                numero,
                colonia,
                ciudad,
                estado,
                codigo_postal,
                latitud,
                longitud,
            });
        });
    }, [isLoaded]);

    return (
        <input
            ref={inputRef}
            placeholder="Buscar dirección..."
            className="w-full border rounded px-3 py-2 text-sm"
        />
    );
};

export default LocationSearchInput;
