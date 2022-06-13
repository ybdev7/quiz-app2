import {
  IUserCredentials,
  IUserWithToken,
} from "../interfaces/EntityInterfaces";

export enum ActionType {
  LOGGINGIN = "LOGGINGIN",
  LOGGEDIN = "LOGGEDIN",
  LOGGEDOUT = "LOGGEDOUT",
}

interface actionLoggingIn {
  type: ActionType.LOGGINGIN;
  payload: IUserCredentials;
}

interface actionLoggedIn {
  type: ActionType.LOGGEDIN;
  payload: IUserWithToken;
}

interface actionLoggout {
  type: ActionType.LOGGEDOUT;
}

export type Action = actionLoggingIn | actionLoggedIn | actionLoggout;

export type State = {
  user: {} | IUserCredentials | IUserWithToken;
};
