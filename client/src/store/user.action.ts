import { useMutation } from "react-query";
import {
  IUserCredentials,
  IUserWithToken,
} from "../interfaces/EntityInterfaces";
import { LOCAL_STORAGE } from "../utils/config";
import { UserWorker } from "../utils/UserWorker";
import { Action, ActionType } from "./action.types";

function loggedin() {
  return { type: ActionType.LOGGINGIN };
}

function logout() {
  new UserWorker().signout();
  return { type: ActionType.LOGGEDOUT };
}

export function getUserToken() {
  let userToken = {};

  try {
    const u = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    userToken = u ? (JSON.parse(u) as IUserWithToken) : {};
  } catch (error) {
    console.log(error);
  }
  return userToken;
}

export function hasUserToken() {
  let userToken = {};

  try {
    const u = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    userToken = u ? (JSON.parse(u) as IUserWithToken) : {};
    return Object.keys(userToken).length !== 0;
  } catch (error) {
    console.log(error);
  }
  return false;
}
