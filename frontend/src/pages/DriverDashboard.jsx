import React, { useState, useEffect } from 'react';
import Map from '../components/Map'; // Reusing the map
import { Car, Power } from 'lucide-react';

const DriverDashboard = () => {
    const [userLocation, setUserLocation] = useState([40.7128, -74.0060]); // NYC
    const [isOnline, setIsOnline] = useState(false);
    const [status, setStatus] = useState('OFFLINE');

    // Simulate Location Tracking
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition((position) => {
                setUserLocation([position.coords.latitude, position.coords.longitude]);
                // In a real app, we would send this to the backend here if isOnline
            });
            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [isOnline]);

    const toggleStatus = () => {
        const newStatus = !isOnline;
        setIsOnline(newStatus);
        setStatus(newStatus ? 'AVAILABLE' : 'OFFLINE');
        // Call backend API here to update status
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/3 p-6 bg-white shadow-xl z-10 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Car className="text-accent" />
                        Driver Portal
                    </h2>

                    <div className={`p-4 rounded-xl border-2 flex items-center justify-between mb-8 ${isOnline ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
                        <div>
                            <p className="text-sm text-gray-500 font-bold uppercase">Current Status</p>
                            <p className={`text-xl font-bold ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>{status}</p>
                        </div>
                        <Power
                            size={32}
                            className={`cursor-pointer transition-all ${isOnline ? 'text-green-600 drop-shadow-lg' : 'text-gray-300'}`}
                            onClick={toggleStatus}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 text-sm">Today's Earnings</p>
                            <p className="text-3xl font-bold text-gray-800">$0.00</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-500 text-sm">Total Rides</p>
                            <p className="text-3xl font-bold text-gray-800">0</p>
                        </div>
                    </div>
                </div>

                <div className="text-center text-gray-400 text-sm">
                    GPS Tracking Active
                </div>
            </div>

            {/* Map */}
            <div className="flex-1 relative">
                <Map center={userLocation} markers={isOnline ? [{ id: 'ME', lat: userLocation[0], lon: userLocation[1] }] : []} />
            </div>
        </div>
    );
};

export default DriverDashboard;
