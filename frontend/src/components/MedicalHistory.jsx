
// src/components/MedicalHistory.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/patients/medical-history', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Loading medical history...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Medical History</h2>
      {history.length === 0 ? (
        <p>No medical history found</p>
      ) : (
        <div className="space-y-6">
          {history.map((record, index) => (
            <div key={index} className="border-b pb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium text-gray-700">Condition</label>
                  <p className="mt-1">{record.condition}</p>
                </div>
                <div>
                  <label className="font-medium text-gray-700">Diagnosis Date</label>
                  <p className="mt-1">{new Date(record.date).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <label className="font-medium text-gray-700">Diagnosis</label>
                  <p className="mt-1">{record.diagnosis}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;