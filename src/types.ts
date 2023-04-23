import { CounterState } from "./store/types/CounterReducerTypes";
import { QuestionState } from "./store/types/QuestionReducerTypes";

export interface Content {
  description: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
}

export interface Question {
  questionId: number;
  title: string;
  content: Content;
  tags: {
    tagId: number;
    name: string;
  }[];
  creator: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Answer {
  answerId: number;
  content: Content;
  question: Question;
  user: User;
}

export interface Tag {
  tagId: number;
  name: string;
}

//--------------STORE-----------

export type RootState = {
  counter: CounterState;
  question: QuestionState;
};
