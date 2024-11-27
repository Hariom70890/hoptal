// services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        localStorage.setItem('token', response.data.token);
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        localStorage.setItem('token', response.data.token);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    }
};

export const appointmentService = {
    getAppointments: () => api.get('/appointments'),
    createAppointment: (data) => api.post('/appointments', data),
    updateAppointment: (id, data) => api.put(`/appointments/${id}`, data)
};

export const prescriptionService = {
    getPrescriptions: () => api.get('/prescriptions'),
    createPrescription: (data) => api.post('/prescriptions', data)
};

export const pharmacyService = {
    getInventory: () => api.get('/pharmacy/inventory'),
    updateMedicineStock: (id, data) => api.put(`/pharmacy/medicine/${id}`, data)
};

export const billService = {
    createBill: (data) => api.post('/bills', data),
    updateBillStatus: (id, status) => api.put(`/bills/${id}/status`, { status })
};