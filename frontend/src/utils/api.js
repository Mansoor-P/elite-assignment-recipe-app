import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    console.log("🔹 Token from localStorage:", token);

    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Token might be invalid or expired.");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
      alert("Your session has expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default api;
