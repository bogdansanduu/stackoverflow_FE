import axios from "axios";

const questionApi = axios.create({
  baseURL: "http://localhost:8080/questions",
});

interface AddQuestionParams {
  title: string;
  description: string;
  userId: number;
  picture: string;
}

export const addQuestion = ({
  title,
  description,
  picture,
  userId,
}: AddQuestionParams) => {
  return questionApi.post("/addQuestion", {
    title,
    description,
    userId,
    picture,
  });
};

export default questionApi;
