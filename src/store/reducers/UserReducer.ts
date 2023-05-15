import { UserType } from "../../types";
import { UserAction, UserState } from "../types/UserReducerTypes";

const INITIAL_STATE_USER: UserType = {
  firstName: "",
  id: 0,
  lastName: "",
};

const INITIAL_STATE: UserState = {
  currentUser: INITIAL_STATE_USER,
};

const UserReducer = (state = INITIAL_STATE, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { currentUser: action.user };
    default:
      return state;
  }
};

export default UserReducer;
