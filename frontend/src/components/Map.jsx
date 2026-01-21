import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon missing in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to recenter map when coordinates change
function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
}

const Map = ({ center, markers }) => {
    return (
        <MapContainer center={center} zoom={13} scrollWheelZoom={true} className="h-full w-full rounded-lg z-0">
            <ChangeView center={center} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User Location */}
            <Marker position={center}>
                <Popup>
                    You are here
                </Popup>
            </Marker>

            {/* Driver Markers */}
            {markers && markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lon]}>
                    <Popup>
                        Driver: {marker.id}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
