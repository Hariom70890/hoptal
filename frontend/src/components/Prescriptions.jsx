
// src/components/prescriptions/Prescriptions.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/prescriptions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPrescriptions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Your Prescriptions</h2>
      {loading ? (
        <p>Loading prescriptions...</p>
      ) : prescriptions.length === 0 ? (
        <p>No prescriptions found</p>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div
              key={prescription._id}
              className="border p-4 rounded"
            >
              <p className="font-semibold">Date: {new Date(prescription.createdAt).toLocaleDateString()}</p>
              <p className="font-semibold mt-2">Diagnosis:</p>
              <p>{prescription.diagnosis}</p>
              <div className="mt-4">
                <p className="font-semibold">Medications:</p>
                <ul className="list-disc pl-5 mt-2">
                  {prescription.medications.map((med, index) => (
                    <li key={index}>
                      {med.name} - {med.dosage} - {med.frequency} for {med.duration}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Instructions:</p>
                <p>{prescription.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prescriptions