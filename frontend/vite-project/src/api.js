import axios from 'axios';

// Define the base URL of your backend API
const API = axios.create({ baseURL: 'http://localhost:8080/api' });

// --- Form API Calls ---
export const getForms = () => API.get('/forms');
export const saveForm = (formData) => API.post('/forms', formData);
export const updateForm = (id, formData) => API.put(`/forms/${id}`, formData);
export const deleteForm = (id) => API.delete(`/forms/${id}`);
export const duplicateForm = (id) => API.post(`/forms/${id}/duplicate`);

// --- Response API Calls (for later) ---
export const submitResponse = (formId, responseData) => API.post(`/forms/${formId}/submit`, responseData);
export const getResponses = (formId) => API.get(`/forms/${formId}/responses`);