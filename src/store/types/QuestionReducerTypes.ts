import { QuestionType } from "../../types";

export type QuestionAction = {
  type: string;
  question: QuestionType;
};

export type QuestionState = {
  currentQuestion: QuestionType;
};
