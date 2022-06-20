export const config: { serverAddress: string } = {
  serverAddress: "http://localhost", //TBD - remove
};

export const HOME_PATH = "/";
export const ABOUT_PATH = "/about";
export const SIGNIN_PATH = "/login";

export const SIGNUP_PATH = "/register";
export const RUN_QUIZ = "/runquiz";
export const ERROR_PATH = "/error";

export const enum LOCAL_STORAGE {
  USER_TOKEN = "userToken",
}
