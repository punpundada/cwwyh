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
    const res = await fetch("/api/auth/token");
    console.log(res)
    const resData = await res.json();
    const token = resData?.token;

    config.headers.Authorization = "Bearer " + token;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
