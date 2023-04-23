import { QuestionAction, QuestionState } from "../types/QuestionReducerTypes";
import { Question } from "../../types";

const INITIAL_STATE_QUESTION: Question = {
  content: {
    description: "",
    createdAt: "",
    updatedAt: "",
    picture: "",
  },
  creator: { firstName: "", id: 0, lastName: "" },
  questionId: 0,
  tags: [],
  title: "",
};

const INITIAL_STATE: QuestionState = {
  currentQuestion: INITIAL_STATE_QUESTION,
};

const QuestionReducer = (
  state = INITIAL_STATE,
  action: QuestionAction
): QuestionState => {
  switch (action.type) {
    case "SET_QUESTION":
      return { currentQuestion: action.question };
    default:
      return state;
  }
};

export default QuestionReducer;
