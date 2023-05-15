import { UserType } from "../../types";

export const SET_CURRENT_USER = (user: UserType) => {
  return {
    type: "SET_USER",
    user,
  };
};
