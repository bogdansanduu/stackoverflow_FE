import axios from "axios";

const answerApi = axios.create({
  baseURL: "http://localhost:8080/answers",
});

answerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

interface AddAnswerParams {
  userId: number;
  questionId: number;
  description: string;
  picture: string;
}

interface VoteAnswerParams {
  userId: number;
  answerId: number;
  value: number;
}

interface DeleteAnswerParams {
  answerId: number;
}

interface UpdateAnswerParams {
  answerId: number;
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

export const voteAnswer = ({ userId, answerId, value }: VoteAnswerParams) => {
  return answerApi.patch("/voteAnswer", {
    userId,
    answerId,
    value,
  });
};

export const deleteAnswer = ({ answerId }: DeleteAnswerParams) => {
  return answerApi.delete(`/deleteById/${answerId}`);
};

export const updateAnswer = ({
  answerId,
  description,
  picture,
}: UpdateAnswerParams) => {
  return answerApi.post("/updateAnswer", {
    answerId,
    description,
    picture,
  });
};

export default answerApi;
