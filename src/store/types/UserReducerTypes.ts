import { UserType } from "../../types";

export type UserAction = {
  type: string;
  user: UserType;
};

export type UserState = {
  currentUser: UserType;
};
