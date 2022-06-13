import { FC, ReactElement, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../interfaces/EntityInterfaces";
import { SIGNIN_PATH } from "../utils/config";
import { UserWorker } from "../utils/UserWorker";

const Signup = (): ReactElement => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [usernameError, setUError] = useState<string>(
    "Username should contain between 8 to 16 alphanumeric characters."
  );

  const [password, setPassword] = useState<string>("");
  const [pwdError, setPwdError] = useState<string>(
    "Password should contain between 8 to 16 characters."
  );

  const mutationCreate = useMutation(new UserWorker().addUser);

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

  const allowSignUp = isConfirmed && usernameError === "" && pwdError === "";

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUError(validateUsername(event.target.value));
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwdError(validatePassword(event.target.value));
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsConfirmed(event.target.value === password);
  };

  const handleSubmit = () => {
    if (allowSignUp) {
      console.log(`in Signup.handleSubmit()`);
      mutationCreate.mutate(
        {
          username: username,
          password: password,
          role: UserRole.Viewer,
        },
        {
          onSuccess: () => {
            setIsLoggedIn(true);
            navigate(SIGNIN_PATH);
          },
          onError: (error: unknown) => {
            alert("error");
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
          <p>Thank you for signing up!</p>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center items-center">
      {/* <form> */}
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
          <p className="text-red-500 text-xs italic">{usernameError}</p>
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
          <p className="text-red-500 text-xs italic">{pwdError}</p>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password<span className="font-bold text-red-700">*</span>
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="passwordconfirm"
            type="password"
            placeholder="******************"
            onChange={handlePasswordConfirmChange}
          />
          <p className="text-red-500 text-xs italic">
            {isConfirmed ? "" : "passwords do not match"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400 focus:outline-none focus:shadow-outline"
            type="button"
            disabled={!allowSignUp}
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
        {/* </form> */}
      </form>
    </div>
  );
};

export default Signup;

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 16;
const USERNAME_REGEX = "^[0-9a-zA-Z]{8,16}$";
function validateUsername(value: string): string {
  if (value.length < USERNAME_MIN_LENGTH) return "Username too short";
  else if (value.length > USERNAME_MAX_LENGTH) return "username too long";
  else if (!value.match(USERNAME_REGEX))
    return "must contain only alphanumeric characters";
  else return "";
}
function validatePassword(value: string): string {
  if (value.length < USERNAME_MIN_LENGTH) return "password too short";
  else if (value.length > USERNAME_MAX_LENGTH) return "password too long";
  else return "";
}
