import { QuestionAction, QuestionState } from "../types/QuestionReducerTypes";
import { QuestionType } from "../../types";

const INITIAL_STATE_QUESTION: QuestionType = {
  content: {
    contentId: -1,
    description: "",
    createdAt: "",
    updatedAt: "",
    picture: "",
  },
  creator: { firstName: "", id: 0, lastName: "" },
  id: 0,
  tags: [],
  title: "",
  voteCount: 0,
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
