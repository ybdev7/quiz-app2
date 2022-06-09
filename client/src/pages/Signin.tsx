import { AxiosError } from "axios";
import { FC, ReactElement, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { IQuizError, UserRole } from "../interfaces/EntityInterfaces";
import { UserWorker } from "../utils/UserWorker";

const Signin = (): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  const handleSubmit = () => {
    if (allowSignIn) {
      console.log(`in Signup.handleSubmit()`);
      mutationCreate.mutate(
        {
          username: username,
          password: password,
        },
        {
          onSuccess: () => {
            setIsLoggedIn(true);
          },
          onError: (error: unknown) => {
            setError(
              `${((error as AxiosError).response?.data as Error).message}`
            );
            console.log(
              ((error as AxiosError).response?.data as Error).message,
              ((error as AxiosError).response?.data as IQuizError).details
            );
            console.log(error);
          },
        }
      );
    }
  };

  if (isLoggedIn) {
    return (
      <>
        <div>
          <p>You are now logged in!</p>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center">
      <form className="w-full max-w-sm">
        <h3>Sign Up</h3>
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
