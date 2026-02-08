import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import { MapPin, Navigation, Locate } from 'lucide-react';
import { requestTrip } from '../services/api';
import axios from 'axios';

const RiderDashboard = () => {
    const [pickupCoords, setPickupCoords] = useState([40.7128, -74.0060]); // Default NYC
    const [destinationCoords, setDestinationCoords] = useState(null);

    const [pickupAddress, setPickupAddress] = useState('New York, NY');
    const [destinationAddress, setDestinationAddress] = useState('');

    const [nearbyDrivers, setNearbyDrivers] = useState([]);

    // Initial location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = [position.coords.latitude, position.coords.longitude];
                    setPickupCoords(coords);
                    reverseGeocode(coords[0], coords[1]).then(addr => setPickupAddress(addr));
                },
                () => console.log("Geolocation permission denied or error")
            );
        }
    }, []);

    // Mock drivers
    useEffect(() => {
        if (pickupCoords) {
            const mockDrivers = [
                { id: 'd1', lat: pickupCoords[0] + 0.002, lon: pickupCoords[1] + 0.002 },
                { id: 'd2', lat: pickupCoords[0] - 0.002, lon: pickupCoords[1] - 0.001 },
                { id: 'd3', lat: pickupCoords[0] + 0.001, lon: pickupCoords[1] - 0.003 },
            ];
            setNearbyDrivers(mockDrivers);
        }
    }, [pickupCoords]);

    const reverseGeocode = async (lat, lon) => {
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
            return res.data.display_name; // Full address
        } catch (e) {
            console.error("Reverse geocode failed", e);
            return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        }
    };

    const forwardGeocode = async (address) => {
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
            if (res.data && res.data.length > 0) {
                return [parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)];
            }
            throw new Error('Address not found');
        } catch (e) {
            console.error("Forward geocode failed", e);
            return null;
        }
    };

    const handleLocateMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const coords = [position.coords.latitude, position.coords.longitude];
                setPickupCoords(coords);
                const addr = await reverseGeocode(coords[0], coords[1]);
                setPickupAddress(addr);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleMapClick = async (latlng) => {
        setDestinationCoords([latlng.lat, latlng.lng]);
        const addr = await reverseGeocode(latlng.lat, latlng.lng);
        setDestinationAddress(addr);
    };

    const handleRequestRide = async () => {
        try {
            let start = pickupCoords;
            let end = destinationCoords;

            // Geocode addresses if coordinates are not set or user manually typed address
            // Simple logic: Always try to forward geocode the text if we don't have exact coords or to ensure text matches
            // Optimistic approach: if text is empty, fail.
            if (!pickupAddress || !destinationAddress) {
                alert("Please enter both pickup and destination addresses.");
                return;
            }

            // If user typed in the box, we might not have updated coords yet.
            // Let's force geocode what's in the text boxes to be safe.
            // (In a real app, we'd use debouncing or Google Places Autocomplete)
            const startGeo = await forwardGeocode(pickupAddress);
            if (startGeo) {
                start = startGeo;
                setPickupCoords(startGeo);
            } else {
                alert(`Could not find location for: ${pickupAddress}`);
                return;
            }

            const endGeo = await forwardGeocode(destinationAddress);
            if (endGeo) {
                end = endGeo;
                setDestinationCoords(endGeo);
            } else {
                alert(`Could not find location for: ${destinationAddress}`);
                return;
            }

            const userId = localStorage.getItem('userId');
            if (!userId) {
                alert("Session expired. Please login again.");
                // window.location.href = '/login'; 
                return;
            }

            const tripData = {
                riderId: parseInt(userId),
                startLat: start[0],
                startLon: start[1],
                endLat: end[0],
                endLon: end[1],
                fare: 25.00 // Mock fare for now
            };

            console.log("Requesting trip:", tripData);
            await requestTrip(tripData);
            alert(`Ride Requested from ${pickupAddress} to ${destinationAddress}!`);

        } catch (err) {
            console.error(err);
            alert('Failed to request ride. ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 p-6 bg-white shadow-xl z-10 flex flex-col">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Navigation className="text-accent" />
                    Where to?
                </h2>

                <div className="space-y-4 mb-6">
                    {/* Pickup Input */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Pickup Location"
                            className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-lg focus:border-accent outline-none transition-all"
                            value={pickupAddress}
                            onChange={(e) => setPickupAddress(e.target.value)}
                        />
                        <button
                            onClick={handleLocateMe}
                            className="absolute right-3 top-3 text-gray-400 hover:text-accent transition-colors"
                            title="Use Current Location"
                        >
                            <Locate size={20} />
                        </button>
                    </div>

                    {/* Destination Input */}
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-black" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Destination"
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent outline-none transition-all shadow-sm"
                            value={destinationAddress}
                            onChange={(e) => setDestinationAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={handleRequestRide}
                        className="w-full bg-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition-all font-mono"
                    >
                        REQUEST RIDE
                    </button>
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative">
                <Map
                    center={pickupCoords || [40.7128, -74.0060]}
                    markers={nearbyDrivers}
                    onMapClick={handleMapClick}
                    destination={destinationCoords}
                />
            </div>
        </div>
    );
};

export default RiderDashboard;
