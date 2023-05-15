import axios from "axios";
import { TagType } from "../types";

const tagApi = axios.create({
  baseURL: "http://localhost:8080/tags",
});

tagApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

export const getAllTags = () => {
  return tagApi.get("/getAll");
};

export const addTagsToQuestion = async (tags: string[], questionId: number) => {
  const returnedTags: TagType[] = [];

  for (const tag of tags) {
    const { data: tagResponse } = await tagApi.post("/addTagToQuestion", {
      questionId,
      tag: {
        name: tag,
      },
    });

    returnedTags.push(tagResponse);
  }

  return returnedTags;
};

export default tagApi;
