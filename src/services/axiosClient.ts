import axios from "axios";
import { API_URL } from "../constants";

// Helper to get cookie by name
// function getCookie(name: string): string | undefined {
//   const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
//   return match ? decodeURIComponent(match[2]) : undefined;
// }

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* just use in case httpOnly set is false in BE side
// Request interceptor: attach access token from cookie
axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
*/

// Response interceptor: handle token refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // If 401 and not already retried
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint (assume refreshToken in cookie)
        await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        // After refresh, retry original request,
        /* just use in case httpOnly set is false in BE side
        const token = getCookie("accessToken");
        if (token && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        */
        // store.dispatch(clearAuth());
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Optionally: redirect to login or handle logout
        localStorage.removeItem("me");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
