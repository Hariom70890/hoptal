
// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
   <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
      Welcome Back!
    </h2>
    {error && (
      <div className="bg-red-100 text-red-700 border border-red-300 p-3 rounded mb-6 text-sm">
        {error}
      </div>
    )}
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </form>
    <p className="mt-6 text-sm text-gray-500 text-center">
      Don’t have an account?{' '}
      <a
        href="/register"
        className="text-blue-600 hover:underline focus:ring-blue-500 focus:outline-none"
      >
        Sign up
      </a>
    </p>
  </div>
</div>

  );
};

export default Login;