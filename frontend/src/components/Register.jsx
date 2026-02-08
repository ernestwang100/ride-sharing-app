import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { register } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'RIDER'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(formData);
            localStorage.setItem('token', res.data.token);
            alert('Registration Successful');
            navigate('/login');
        } catch (err) {
            alert('Registration Failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl w-96 space-y-6">
                <h1 className="text-3xl font-bold text-center text-primary italic underline decoration-accent">Join the Ride</h1>

                <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

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

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'RIDER' })}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all ${formData.role === 'RIDER' ? 'bg-accent text-white border-accent' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                        Rider
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData({ ...formData, role: 'DRIVER' })}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition-all ${formData.role === 'DRIVER' ? 'bg-accent text-white border-accent' : 'bg-white text-gray-500 border-gray-200'}`}
                    >
                        Driver
                    </button>
                </div>

                <button className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-secondary transition-all shadow-lg transform hover:-translate-y-1">
                    Sign Up
                </button>

                <p className="text-center text-gray-500 text-sm">
                    Already have an account? <Link to="/login" className="text-accent cursor-pointer hover:underline">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
