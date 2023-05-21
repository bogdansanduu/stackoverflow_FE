import { QuestionState } from "./store/types/QuestionReducerTypes";
import { UserState } from "./store/types/UserReducerTypes";

export interface ContentType {
  contentId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  picture: string;
}

export interface QuestionType {
  id: number;
  title: string;
  content: ContentType;
  tags: {
    tagId: number;
    name: string;
  }[];
  creator: UserType;
  voteCount: number;
}

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  score: number;
  role: string;
  banned: boolean;
}

export interface AnswerType {
  id: number;
  content: ContentType;
  question: QuestionType;
  creator: UserType;
  voteCount: number;
}

export interface TagType {
  tagId: number;
  name: string;
}

//--------------STORE-----------

export type RootState = {
  user: UserState;
  question: QuestionState;
};
