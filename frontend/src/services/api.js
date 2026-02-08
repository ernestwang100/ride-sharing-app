import axios from 'axios';

const authApi = axios.create({ baseURL: 'http://localhost:8081' });
const driverApi = axios.create({ baseURL: 'http://localhost:8082' });
const riderApi = axios.create({ baseURL: 'http://localhost:8083' });
const matchApi = axios.create({ baseURL: 'http://localhost:8084' });
const tripApi = axios.create({ baseURL: 'http://localhost:8085' });
const apis = [authApi, driverApi, riderApi, matchApi, tripApi];

apis.forEach(api => {
    api.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
});

// Auth
export const login = (data) => authApi.post('/auth/login', data);
export const register = (data) => authApi.post('/auth/register', data);

// Driver
export const updateDriverLocation = (id, lat, lon) => driverApi.patch(`/drivers/${id}/location`, { latitude: lat, longitude: lon });
export const updateDriverStatus = (id, status) => driverApi.patch(`/drivers/${id}/status`, null, { params: { status } });

// Rider
export const getRiderProfile = (id) => riderApi.get(`/riders/${id}`);

// Match
export const findNearbyDrivers = (lat, lon) => matchApi.get('/match/nearby', { params: { lat, lon } });

// Trip
export const requestTrip = (tripData) => tripApi.post('/trips', tripData);
export const getTrip = (id) => tripApi.get(`/trips/${id}`);

export default { authApi, driverApi, riderApi, matchApi, tripApi };
