export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
  return `${baseUrl}/${endpoint}`;
};