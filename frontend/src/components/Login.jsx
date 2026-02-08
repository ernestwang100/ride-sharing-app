import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId); // Save User ID
            if (res.data.role === 'DRIVER') {
                navigate('/driver-dashboard');
            } else {
                navigate('/rider-dashboard');
            }
        } catch (err) {
            alert('Login Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl w-96 space-y-6">
                <h1 className="text-3xl font-bold text-center text-primary italic underline decoration-accent">Welcome Back</h1>

                <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent outline-none transition-all"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-secondary transition-all shadow-lg transform hover:-translate-y-1">
                    Login
                </button>

                <p className="text-center text-gray-500 text-sm">
                    Don't have an account? <Link to="/register" className="text-accent cursor-pointer hover:underline">Sign Up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
