// src/components/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Link to="/appointments" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-2">Appointments</h3>
        <p className="text-gray-600">View and manage your appointments</p>
      </Link>
      <Link to="/prescriptions" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-2">Prescriptions</h3>
        <p className="text-gray-600">Access your prescriptions</p>
      </Link>
      <Link to="/medical-history" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold mb-2">Medical History</h3>
        <p className="text-gray-600">View your medical records</p>
      </Link>
    </div>
  );
};

export default Dashboard;