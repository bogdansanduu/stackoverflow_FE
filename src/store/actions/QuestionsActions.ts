import { QuestionType } from "../../types";

export const SET_CURRENT_QUESTION = (question: QuestionType) => {
  return {
    type: "SET_QUESTION",
    question,
  };
};
