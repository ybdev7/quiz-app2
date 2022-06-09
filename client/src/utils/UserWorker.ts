import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import {
  IUser,
  IUserCredentials,
  IUserWithToken,
} from "../interfaces/EntityInterfaces";
import { config } from "./config";

//The worker that will perform user operations
export class UserWorker {
  /**
   * Adds a new user on server
   * @param user - new user to be added
   * @returns newly added user
   */
  public async addUser(user: IUser): Promise<IUser> {
    console.log(`UsersWorker.addUser(${user.username})`);

    const response: AxiosResponse = await axios.post(
      `${config.serverAddress}/user`,
      user
    );
    return response.data;
  }

  public async signin(user: IUserCredentials): Promise<IUserWithToken> {
    console.log(`UsersWorker.signin(${user.username})`);

    const response: AxiosResponse = await axios.post(
      `${config.serverAddress}/user/signin`,
      user
    );
    return response.data;
  }
}
