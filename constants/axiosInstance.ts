import { store } from "@/redux/store";
import axios from "axios";

// Define your base URL here
const production = true;
// const production = true;
const BASE_URL = production ? "https://sms-backend-tawny.vercel.app/api/v1" : "http://10.0.2.2:5001/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    "user-hash": store.getState().user.hash,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const hash = store.getState().user.hash; // Fetch latest hash from Redux store
  if (hash) {
    config.headers["user-hash"] = hash;
  }
  return config;
});

// // // Optional: Add request interceptor for adding dynamic headers or tokens
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Example: Add authentication token dynamically
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Optional: Add response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common error scenarios
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Data:", error.response.data);
      console.error("Status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
