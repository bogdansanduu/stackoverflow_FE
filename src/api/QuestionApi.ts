import axios from "axios";

const questionApi = axios.create({
  baseURL: "http://localhost:8080/questions",
});

questionApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token !== null ? `Bearer ${token}` : "";
  return config;
});

interface AddQuestionParams {
  title: string;
  description: string;
  userId: number;
  picture: string;
}

interface VoteQuestionParams {
  userId: number;
  questionId: number;
  value: number;
}

interface DeleteQuestionParams {
  questionId: number;
}

interface UpdateQuestionParams {
  questionId: number;
  title: string;
  description: string;
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

export const voteQuestion = ({
  userId,
  questionId,
  value,
}: VoteQuestionParams) => {
  return questionApi.patch("/voteQuestion", {
    userId,
    questionId,
    value,
  });
};

export const deleteQuestion = ({ questionId }: DeleteQuestionParams) => {
  return questionApi.delete(`/deleteById/${questionId}`);
};

export const updateQuestion = ({
  questionId,
  title,
  description,
  picture,
}: UpdateQuestionParams) => {
  return questionApi.post("/updateQuestion", {
    questionId,
    title,
    description,
    picture,
  });
};

export default questionApi;
