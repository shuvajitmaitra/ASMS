import axios from "axios";

// Define your base URL here
const BASE_URL = true ? "https://sms-backend-tawny.vercel.app/api/v1" : "http://localhost:5001/api/v1";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
});

// // Optional: Add request interceptor for adding dynamic headers or tokens
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

// // Optional: Add response interceptor for global error handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle common error scenarios
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.error("Data:", error.response.data);
//       console.error("Status:", error.response.status);
//     } else if (error.request) {
//       // The request was made but no response was received
//       console.error("No response received");
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
