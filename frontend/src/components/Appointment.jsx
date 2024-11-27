
// src/components/appointments/Appointments.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    date: '',
    timeSlot: '',
    reason: ''
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/appointments', newAppointment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAppointments();
      setNewAppointment({
        doctorId: '',
        date: '',
        timeSlot: '',
        reason: ''
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Book New Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Doctor</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={newAppointment.doctorId}
              onChange={(e) => setNewAppointment({...newAppointment, doctorId: e.target.value})}
            >
              <option value="">Select Doctor</option>
             <option value="1">Dr. Emily Carter - Cardiologist</option>
    <option value="2">Dr. Michael Smith - Orthopedic Surgeon</option>
    <option value="3">Dr. Sarah Johnson - Pediatrician</option>
    <option value="4">Dr. James Lee - Neurologist</option>
    <option value="5">Dr. Olivia Brown - Dermatologist</option>
    <option value="6">Dr. Daniel Wilson - General Physician</option>
 
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Time Slot</label>
            <select
              className="w-full px-3 py-2 border rounded"
              value={newAppointment.timeSlot}
              onChange={(e) => setNewAppointment({...newAppointment, timeSlot: e.target.value})}
            >
                          <option value="">Select Time Slot</option> 
                           <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
    <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
    <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
    <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>

            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Reason</label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              value={newAppointment.reason}
              onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Your Appointments</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border p-4 rounded"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                    <p>Time: {appointment.timeSlot}</p>
                    <p>Status: {appointment.status}</p>
                    <p>Reason: {appointment.reason}</p>
                  </div>
                  {appointment.status === 'scheduled' && (
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    //   onClick={() => handleCancelAppointment(appointment._id)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments