import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:8080/admin",
});

adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const banUser = (userId: number) => {
  return adminApi.patch(`/banUser/${userId}`);
};
