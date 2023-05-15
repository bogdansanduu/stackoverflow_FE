import { combineReducers } from "redux";
import QuestionReducer from "./QuestionReducer";
import UserReducer from "./UserReducer";

export const AllReducers = combineReducers({
  question: QuestionReducer,
  user: UserReducer,
});
