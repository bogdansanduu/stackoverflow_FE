import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8080/users",
});

userApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllUsers = () => {
  return userApi.get("/getAll");
};

export default userApi;
