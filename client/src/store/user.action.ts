import { IUserWithToken } from "../interfaces/EntityInterfaces";
import { LOCAL_STORAGE } from "../utils/config";

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

export function login(userToken: IUserWithToken) {
  try {
    localStorage.setItem(LOCAL_STORAGE.USER_TOKEN, JSON.stringify(userToken));
  } catch (error) {
    console.log(error);
  }
}

export function logout() {
  try {
    localStorage.removeItem(LOCAL_STORAGE.USER_TOKEN);
  } catch (error) {
    console.log(error);
  }
}
