import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("❌ API Error:", error.message);

    if (error.code === "ERR_NETWORK") {
      console.log("⚠️  Backend server is not running.");
      console.log("💡 Start backend: cd backend && npm run dev");
    }

    return Promise.reject(error);
  }
);

export default api;
