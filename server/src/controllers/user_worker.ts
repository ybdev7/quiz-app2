import Nedb from "nedb";
import * as path from "path";
import { IUser } from "../interfaces/interfaces";

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
    console.log("IN UserWorker.addUser()", user);

    return new Promise<IUser>((resolveHandler, rejectHandler) => {
      this._db.insert<IUser>(user, (err: Error | null, newUser: IUser) => {
        if (err) {
          console.log("ERROR in UserWorker.addUser(): ", err);
          rejectHandler(err);
        } else {
          console.log("SUCCESS in UserWorker.addUser(): ", newUser);
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
    console.log("UserWorker.updateUser()", user);

    return new Promise<IUser>((resolveHandler, rejectHandler) => {
      this._db.update<IUser>(
        { _id: user._id },
        user,
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
