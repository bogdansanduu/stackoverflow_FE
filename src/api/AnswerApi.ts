import axios from "axios";

const answerApi = axios.create({
  baseURL: "http://localhost:8080/answers",
});

interface AddAnswerParams {
  userId: number;
  questionId: number;
  description: string;
  picture: string;
}

export const addAnswer = ({
  userId,
  questionId,
  description,
  picture,
}: AddAnswerParams) => {
  return answerApi.post("/addAnswer", {
    userId,
    questionId,
    description,
    picture,
  });
};

export default answerApi;
