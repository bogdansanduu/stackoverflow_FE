import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8080/users",
});

export const getAllUsers = () => {
  return userApi.get("/getAll");
};

export default userApi;
