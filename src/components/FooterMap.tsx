'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in Next.js
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

L.Marker.prototype.options.icon = defaultIcon;

interface FooterMapProps {
    lat: number;
    lng: number;
}

export default function FooterMap({ lat, lng }: FooterMapProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Prevent SSR rendering issues with react-leaflet
    if (!isMounted) {
        return (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
                Loading Map...
            </div>
        );
    }

    return (
        <MapContainer 
            center={[lat, lng]} 
            zoom={15} 
            scrollWheelZoom={false}
            className="absolute inset-0 w-full h-full z-0"
            style={{ minHeight: '100%', minWidth: '100%' }}
        >
            {/* CartoDB Dark Matter free tiles */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[lat, lng]} />
        </MapContainer>
    );
}
