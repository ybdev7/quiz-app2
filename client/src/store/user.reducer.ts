import {
  IUserCredentials,
  IUserWithToken,
} from "../interfaces/EntityInterfaces";
import { Action, ActionType, State } from "./action.types";

//initially user is not logged in
const initialState: State = {
  user: {},
};

const userReducer = (state: State = initialState, action: Action): State => {
  console.log("action=" + action.type);
  switch (action.type) {
    case ActionType.LOGGEDOUT:
      return {
        ...state,
        user: {},
      };

    case ActionType.LOGGINGIN:
      const loginCred: IUserCredentials = {
        username: (action.payload as IUserCredentials).username,
        password: (action.payload as IUserCredentials).password,
      };
      return {
        ...state,
        user: loginCred,
      };

    case ActionType.LOGGEDIN:
      const u = localStorage.getItem("userToken");
      const userToken = u ? (JSON.parse(u) as IUserWithToken) : {};
      console.log("user.reducer " + userToken);
      return {
        ...state,
        user: userToken,
      };
  }
  return state;
};

export default userReducer;
