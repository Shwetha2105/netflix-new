// API Configuration
// For Vercel deployment without separate backend, we'll use localStorage auth
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default API_BASE_URL;
