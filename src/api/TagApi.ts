import axios from "axios";
import { Tag } from "../types";

const tagApi = axios.create({
  baseURL: "http://localhost:8080/tags",
});

export const getAllTags = () => {
  return tagApi.get("/getAll");
};

export const addTagsToQuestion = async (tags: string[], questionId: number) => {
  const returnedTags: Tag[] = [];

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
