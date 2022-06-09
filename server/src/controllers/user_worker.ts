import Nedb from "nedb";
import * as path from "path";
import {
  IUser,
  IUserCredentials,
  IUserWithToken,
} from "../interfaces/interfaces";
import { hashSync, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { secret } from "../config/authorization";

export class UserWorker {
  private _db: Nedb;

  constructor() {
    this._db = new Nedb({
      filename: path.join(__dirname, "user.db"),
      autoload: true,
    });

    const p = path.join(__dirname, "user.db");
    console.log(`UserWorker.constructor: DB path=${p}`);
  }

  public addUser(user: IUser): Promise<IUser> {
    console.log("IN UserWorker.addUser()", user.username);

    const encUser: IUser = { ...user, password: hashSync(user.password, 8) };

    return new Promise<IUser>((resolveHandler, rejectHandler) => {
      this._db.insert<IUser>(encUser, (err: Error | null, newUser: IUser) => {
        if (err) {
          console.log("ERROR in UserWorker.addUser(): ", err);
          rejectHandler(err);
        } else {
          console.log("SUCCESS in UserWorker.addUser(): ", newUser.username);
          resolveHandler(newUser);
        }
      });
    });
  }

  public listUsers(): Promise<IUser[]> {
    console.log("in UserWorker.listUsers()");

    return new Promise((resolveHandler, rejectHandler) => {
      this._db.find({}, (err: Error, users: IUser[]) => {
        if (err) {
          console.log("ERROR in UserWorker.listUserzes(): Error", err);
          rejectHandler(err);
        } else {
          console.log(
            `SUCCESS in UserWorker.listUserzes(). Retrieved ${users.length} users.`
          );
          resolveHandler(users);
        }
      });
    });
  }

  public signin(user: IUserCredentials): Promise<IUserWithToken> {
    return new Promise((resolveHandler, rejectHandler) => {
      this.getUserByUsername(user.username).then((u) => {
        if (!u) {
          console.log(
            `ERROR in UserWorker.signin for user=(${user.username}): Error - user not found`
          );
          rejectHandler(new Error("user not found"));
        } else {
          const isPwdCorrect = compareSync(user.password, u.password);
          if (!isPwdCorrect) {
            console.log(
              `ERROR in UserWorker.signin for user=(${user.username}): Error password doesn't match`
            );
            rejectHandler(new Error("username and password do not match"));
          } else {
            var token = sign({ id: u._id }, secret, {
              expiresIn: 86400,
            });
            const userWithToken: IUserWithToken = {
              _id: u._id,
              username: u.username,
              role: u.role,
              token: token,
            };
            resolveHandler(userWithToken);
          }
        }
      });
    });
  }

  /**
   *
   * @param id
   * @returns null if no user with such id exists in the database
   */
  public getUserById(id: string): Promise<IUser> {
    console.log(`in UserWorker.getUserById(${id})`);

    return new Promise((resolveHandler, rejectHandler) => {
      this._db.findOne({ _id: id }, (err: Error | null, user: IUser) => {
        if (err) {
          console.log(`ERROR in UserWorker.getUserById(${id}): Error`, err);
          rejectHandler(err);
        } else {
          if (user) console.log(`SUCCESS in UserWorker.getUserById(${id}).`);
          resolveHandler(user);
        }
      });
    });
  }

  /**
   *
   * @param username
   * @returns null if no user with such id exists in the database
   */
  public getUserByUsername(username: string): Promise<IUser> {
    console.log(`in UserWorker.getUserByUsername(${username})`);

    return new Promise((resolveHandler, rejectHandler) => {
      this._db.findOne(
        { username: username },
        (err: Error | null, user: IUser) => {
          if (err) {
            console.log(
              `ERROR in UserWorker.getUserByUsername(${username}): Error`,
              err
            );
            rejectHandler(err);
          } else {
            if (user)
              console.log(
                `SUCCESS in UserWorker.getUserByUsername(${username}).`
              );
            resolveHandler(user);
          }
        }
      );
    });
  }

  public deleteUser(id: string): Promise<string> {
    console.log("in UserWorker.deleteUser()", id);

    return new Promise<string>((resolveHandler, rejectHandler) => {
      this._db.remove(
        { _id: id },
        {},
        (err: Error | null, numRemoved: number) => {
          if (err) {
            console.log("ERROR in UserWorker.deleteUser(): ", err);
            rejectHandler(err);
          } else {
            console.log("SUCCESS in UserWorker.deleteUser():", numRemoved);
            resolveHandler(id);
          }
        }
      );
    });
  }

  public updateUser(user: IUser): Promise<IUser> {
    console.log("UserWorker.updateUser()", user.username);

    const u: IUser = { ...user, password: hashSync(user.password, 8) };

    return new Promise<IUser>((resolveHandler, rejectHandler) => {
      this._db.update<IUser>(
        { _id: user._id },
        u,
        { returnUpdatedDocs: true },
        (
          err: Error | null,
          numOfUpdated: number,
          updatedDoc: any,
          upsert: boolean
        ) => {
          if (err) {
            console.log("ERROR in UserWorker.updateUser(): ", err);
            rejectHandler(err);
          } else {
            console.log(
              "SUCCESS in UserWorker.updateUser(): ",
              (updatedDoc as IUser)._id
            );
            resolveHandler(updatedDoc as IUser);
          }
        }
      );
    });
  }
  public deleteAll(): Promise<void> {
    console.log("IN UserWorker.deleteAll()");

    return new Promise<void>((resolveHandler, rejectHandler) => {
      this._db.remove({}, { multi: true }, (err: Error | null, numRemoved) => {
        if (err) {
          console.log("ERROR in UserWorker.deleteAll(): ", err);
          rejectHandler(err);
        } else {
          console.log(
            `SUCCESS in UserWorker.deleteAll(), removed ${numRemoved} entries.`
          );
          resolveHandler();
        }
      });
    });
  }
}
