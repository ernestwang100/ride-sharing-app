import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import { MapPin, Navigation } from 'lucide-react';
import { requestTrip } from '../services/api';

const RiderDashboard = () => {
    const [userLocation, setUserLocation] = useState([40.7128, -74.0060]); // Default NYC
    const [destination, setDestination] = useState('');
    const [nearbyDrivers, setNearbyDrivers] = useState([]);

    // Mock getting location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
            });
        }
    }, []);

    // Mock drivers for visualization for now
    useEffect(() => {
        // Simulate finding drivers around the user
        const mockDrivers = [
            { id: 'd1', lat: userLocation[0] + 0.002, lon: userLocation[1] + 0.002 },
            { id: 'd2', lat: userLocation[0] - 0.002, lon: userLocation[1] - 0.001 },
            { id: 'd3', lat: userLocation[0] + 0.001, lon: userLocation[1] - 0.003 },
        ];
        setNearbyDrivers(mockDrivers);
    }, [userLocation]);

    const handleRequestRide = async () => {
        try {
            // Mock Rider ID for now (demo mode)
            const riderId = 1;
            const tripData = {
                riderId: riderId,
                startLat: userLocation[0],
                startLon: userLocation[1],
                // endLat/Lon would be from destination geocoding in a real app
                endLat: userLocation[0] + 0.01,
                endLon: userLocation[1] + 0.01
            };
            await requestTrip(tripData);
            alert('Ride Requested! Finding drivers...');
        } catch (err) {
            console.error(err);
            alert('Failed to request ride');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar / Floating Panel */}
            <div className="w-1/3 p-6 bg-white shadow-xl z-10 flex flex-col">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Navigation className="text-accent" />
                    Where to?
                </h2>

                <div className="space-y-4 mb-6">
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Current Location"
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                            value="Current Location"
                            readOnly
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-black" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Destination"
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent outline-none transition-all shadow-sm"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleRequestRide}
                        className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-all"
                    >
                        Request Ride
                    </button>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative">
                <Map center={userLocation} markers={nearbyDrivers} />
            </div>
        </div>
    );
};

export default RiderDashboard;
