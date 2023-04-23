import { Question } from "../../types";

export const SET_CURRENT_QUESTION = (question: Question) => {
  return {
    type: "SET_QUESTION",
    question,
  };
};
