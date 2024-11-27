
// src/components/auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Contact Number</label>
          <input
            type="tel"
            className="w-full px-3 py-2 border rounded"
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Address</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;