import axios from "axios";

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
    console.log(`🚀 ${config.method.toUpperCase()} ${config.url}`);
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
    console.log(`✅ ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ API Error:", error.response.data);
    } else if (error.code === "ERR_NETWORK") {
      console.log("⚠️ Backend server is not running.");
      console.log("💡 Start backend: cd backend && npm start");
    }
    return Promise.reject(error);
  }
);

export default api;