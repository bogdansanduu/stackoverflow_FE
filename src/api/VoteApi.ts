import axios from "axios";

const voteApi = axios.create({
  baseURL: "http://localhost:8080/votes",
});

voteApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getVote = (userId: number, contentId: number) => {
  return voteApi.get("/getVote", {
    params: {
      userId,
      contentId,
    },
  });
};
