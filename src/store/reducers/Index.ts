import CounterReducer from "./CounterReducer";
import { combineReducers } from "redux";
import QuestionReducer from "./QuestionReducer";

export const AllReducers = combineReducers({
  counter: CounterReducer,
  question: QuestionReducer,
});
