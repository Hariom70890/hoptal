
// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="font-medium text-gray-700">Name</label>
          <p className="mt-1">{profile?.name}</p>
        </div>
        <div>
          <label className="font-medium text-gray-700">Email</label>
          <p className="mt-1">{profile?.email}</p>
        </div>
        <div>
          <label className="font-medium text-gray-700">Contact Number</label>
          <p className="mt-1">{profile?.contactNumber || 'Not provided'}</p>
        </div>
        <div>
          <label className="font-medium text-gray-700">Address</label>
          <p className="mt-1">{profile?.address || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;