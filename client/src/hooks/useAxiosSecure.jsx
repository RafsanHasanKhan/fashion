import axios from 'axios';
const axiosSecure = axios.create({
  baseURL: 'http://localhost:5173',
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
