// src/App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import './tailwind.css';
 import { useAuth } from './Context/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointment';
import MedicalHistory from './components/MedicalHistory';
import Prescriptions from './components/Prescriptions';
import Profile from './components/Profile';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar />   */}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/appointments" element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            } />
            <Route path="/medical-history" element={
              <PrivateRoute>
                <MedicalHistory />
              </PrivateRoute>
            } />
            <Route path="/prescriptions" element={
              <PrivateRoute>
                <Prescriptions />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;