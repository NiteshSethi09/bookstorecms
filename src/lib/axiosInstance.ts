import axios from "axios";
import { endpoints } from "./config";

export const axiosInstance = axios.create({
  baseURL: endpoints[import.meta.env.VITE_NODE_ENV as keyof typeof endpoints],
});

axiosInstance.interceptors.request.use(function (config) {
  if (!(config.data instanceof FormData)) {
    config.data = { ...config.data, role: "ADMIN" };
  }

  return config;
});
