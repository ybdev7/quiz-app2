import {
  IUserCredentials,
  IUserWithToken,
} from "../interfaces/EntityInterfaces";
import { LOCAL_STORAGE } from "../utils/config";
import { Action, ActionType, State } from "./action.types";
import { getUserToken, hasUserToken } from "./user.action";

//initially user is not logged in
const initialState: State = {
  //tbd - read from local storage
  user: getUserToken(),
  isLoggedIn: hasUserToken(),
};

const userReducer = (state: State = initialState, action: Action): State => {
  console.log("action=" + action.type);
  switch (action.type) {
    case ActionType.LOGGEDOUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };

    case ActionType.LOGGINGIN:
      const loginCred: IUserCredentials = {
        username: (action.payload as IUserCredentials).username,
        password: (action.payload as IUserCredentials).password,
      };
      return {
        ...state,
        user: loginCred,
        isLoggedIn: false,
      };

    case ActionType.LOGGEDIN:
      //   const u = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
      //   const userToken = u ? (JSON.parse(u) as IUserWithToken) : {};
      const userToken = getUserToken();
      console.log("user.reducer " + userToken);
      return {
        ...state,
        user: userToken,
        isLoggedIn: true,
      };
  }
  return state;
};

export default userReducer;
