'use client';

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

// Ensure we set the icon only on the client.
if (typeof window !== 'undefined') {
    L.Marker.prototype.options.icon = defaultIcon;
}

interface FooterMapProps {
    lat: number;
    lng: number;
}

export default function FooterMap({ lat, lng }: FooterMapProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Manage Leaflet map instance manually to avoid "container already initialized" errors
    // that occur when react-leaflet's MapContainer re-renders on the same DOM element.
    useEffect(() => {
        if (!containerRef.current) return;

        // Create tile layer
        const tileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        });

        // Create map instance directly
        const map = L.map(containerRef.current, {
            center: [lat, lng],
            zoom: 15,
            scrollWheelZoom: false,
            layers: [tileLayer],
            zoomControl: true,
        });

        // Add marker
        L.marker([lat, lng], { icon: defaultIcon }).addTo(map);

        return () => {
            map.remove();
        };
    }, [lat, lng]);

    if (!isMounted) {
        return (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Loading Map...
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 w-full h-full z-0"
            style={{ minHeight: '100%', minWidth: '100%' }}
        />
    );
}
