import { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { IUserWithToken } from "../interfaces/EntityInterfaces";
import { UserWorker } from "../utils/UserWorker";
import { ActionType } from "../store/action.types";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE, SIGNUP_PATH } from "../utils/config";

const Signin = (): ReactElement => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [usernameError, setUError] = useState<string>("Please enter username");

  const [password, setPassword] = useState<string>("");
  const [pwdError, setPwdError] = useState<string>("Please enter password.");

  const [signinError, setError] = useState<string>("");

  const mutationCreate = useMutation(new UserWorker().signin);

  const allowSignIn = usernameError === "" && pwdError === "";

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUError(validateUsername(event.target.value));
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwdError(validatePassword(event.target.value));
    setPassword(event.target.value);
  };

  async function handleSubmit() {
    if (allowSignIn) {
      console.log(`in Signup.handleSubmit()`);

      dispatch({
        type: ActionType.LOGGINGIN,
        payload: {
          username: username,
          password: password,
        },
      });

      mutationCreate.mutate(
        {
          username: username,
          password: password,
        },
        {
          onSuccess: (userToken: IUserWithToken) => {
            console.log("login success");
            // localStorage.setItem("userToken", JSON.stringify(userToken));
            localStorage.setItem(
              LOCAL_STORAGE.USER_TOKEN,
              JSON.stringify(userToken)
            );

            dispatch({ type: ActionType.LOGGEDIN, payload: userToken });
            navigate("/");
          },
          onError: (error: unknown) => {
            dispatch({ type: ActionType.LOGGEDOUT, payload: {} });
            setError("Username and password do not match. Please try again.");
            console.log(error);
          },
        }
      );
    }
  }

  return (
    <div className="flex justify-center items-center">
      <form className="w-full max-w-sm">
        <h3>Sign In</h3>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username<span className="font-bold text-red-700">*</span>
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <p className="text-slate-500 text-xs italic">{usernameError}</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password<span className="font-bold text-red-700">*</span>
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="text-slate-500 text-xs italic">{pwdError}</p>
        </div>
        <div>
          <p>
            <span className="block text-gray-700 text-sm font-bold m-2"></span>
            {signinError}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400 focus:outline-none focus:shadow-outline"
            type="button"
            disabled={!allowSignIn}
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p>
            Don't have an account?{" "}
            <a className="text-blue-700" href={SIGNUP_PATH}>
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 16;
const USERNAME_REGEX = "^[0-9a-zA-Z]{8,16}$";
function validateUsername(value: string): string {
  if (value.length == 0) return "Please enter username";
  else return "";
}
function validatePassword(value: string): string {
  if (value.length == 0) return "Please enter password";
  else return "";
}
