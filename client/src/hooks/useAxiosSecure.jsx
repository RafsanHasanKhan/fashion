import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOutUser } = useAuth();

  // Create a new axios instance
  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', // Replace with your environment-based URL if needed
  });

  // Request interceptor
  axiosSecure.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Corrected casing for "Authorization"
      }
      return config;
    },
    error => {
      // Handle request errors
      console.error('Request Error:', error.message);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    response => response, // Return the response directly if successful
    async error => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        try {
          await logOutUser();
          navigate('/login', { replace: true });
        } catch (logoutError) {
          console.error('Error during logout:', logoutError.message);
        }
      }

      // Handle other errors gracefully
      console.error('Response Error:', error.message);
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
