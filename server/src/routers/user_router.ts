import express, { NextFunction, Request, Response } from "express";
import {
  BaseError,
  UserNotDeleted,
  UserNotFound,
  UserNotUpdated,
} from "../errors";
import { IUser, IUserWithToken } from "../interfaces/interfaces";
import { userWorker } from "../controllers/userDAL";
import {
  checkDuplicateUsername,
  checkUsernameValid,
} from "../middleware/user.verification";

//create router
const userRouter = express.Router();

/**
 * Logs start of endpoint logic
 */
userRouter.use((req, res, next) => {
  //log date and time, method, and url for each request
  console.log(
    `>> ${new Date(Date.now()).toLocaleString()} ${req.method} ${req.baseUrl}${
      req.url
    } `
  );
  next();
});

/**
 * Tests if router endpoint can be reached
 */
userRouter.get("/test", (req, res, next) => {
  res.json({ message: "User router test::working!" });
  next();
});

/**
 * Responds with an error
 */
userRouter.get("/error", (req, res, next) => {
  try {
    throw new BaseError();
  } catch (err) {
    next(err);
  }
  next();
});

/**
 * GET all users
 */
userRouter.get("/", async (req, res, next) => {
  try {
    const users: IUser[] = await userWorker.listUsers();
    res.json(users);
    next();
  } catch (err) {
    next(new UserNotFound((err as any).stack));
  }
});

/**
 * Get one user by id.
 * Throws a UserNotFound error in case su such id exists
 */
userRouter.get("/id=:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    // const userWorker: UserWorker = new UserWorker();
    const user: IUser = await userWorker.getUserById(id);
    if (!user) {
      throw new UserNotFound(id);
    }
    res.json(user);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Add a new user
 */
userRouter.post(
  "/",
  [checkDuplicateUsername, checkUsernameValid],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUser = await userWorker.addUser(req.body);
      res.json(user);
      next();
    } catch (err) {
      next(new BaseError(500, "Failed to add user", (err as any).stack)); //tbd
    }
  }
);

userRouter.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: IUserWithToken = await userWorker.signin(req.body);
      res.json(user);
      next();
    } catch (err) {
      next(new BaseError(500, "Failed to signin user.", (err as any).stack)); //tbd
    }
  }
);

/**
 * Update existing user
 */
userRouter.put("/", async (req, res, next) => {
  try {
    // const userWorker: UserWorker = new UserWorker();
    const user: IUser = await userWorker.updateUser(req.body);
    res.json(user);
  } catch (err) {
    next(new UserNotUpdated(req.body._id));
  }
});

userRouter.delete("/id=:id", async (req, res, next) => {
  console.log("DELETE /user", req.body);
  try {
    // const userWorker: UserWorker = new UserWorker();
    await userWorker.deleteUser(req.params.id);
    res.send({ message: "ok" });
  } catch (err) {
    next(new UserNotDeleted(req.body._id));
  }
});

/**
 * Logs end of endpoint logic
 */
userRouter.use((req, res, next) => {
  //log end of each request
  console.log(`<<END ${req.method} ${req.baseUrl}${req.url} `);
  next();
});

/**Error handling */
userRouter.use(
  (err: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
    console.log(
      `ERROR:: ${req.method} ${req.baseUrl}${req.url} - ${err.message}`
    );

    let error: BaseError;
    if (!(err instanceof BaseError)) {
      error = new BaseError(500, err.message, err.stack);
    } else {
      error = err;
    }
    res
      .status(error.status)
      .send({ message: error.message, details: error.details });
  }
);

//export router
module.exports = userRouter;
