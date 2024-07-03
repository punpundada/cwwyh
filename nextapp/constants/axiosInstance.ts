import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

const notProtectedRoutes = ["/user/login", "/user/signup"];

axiosInstance.interceptors.request.use(
  async (config) => {
    if (notProtectedRoutes.includes(config.url || "")) {
      return config;
    }

    let token = "";
    if (window?.sessionStorage) {
      token = window.sessionStorage.getItem("accessToken")!;
    }

    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
