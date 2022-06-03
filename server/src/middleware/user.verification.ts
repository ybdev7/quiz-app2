import { IUser } from "../interfaces/interfaces";
import { userWorker } from "../controllers/userDAL";
import { NextFunction, Request, Response } from "express";

const USERNAME_MIN_LENGTH = 8;
const USERNAME_MAX_LENGTH = 16;
const USERNAME_REGEX = "^[0-9a-zA-Z]{8,16}$";

export const checkDuplicateUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const existing = await userWorker.getUserByUsername(req.body.username);
  console.log("UsernameCheck for:" + req.body.username);
  console.log(existing);
  if (existing) {
    res.status(400).send({
      message: "Username already exists.",
    });
    // next();
  } else {
    next();
  }
};

export const checkUsernameValid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.username.length < USERNAME_MIN_LENGTH) {
    res.status(400).send({
      message: "Username too short.",
    });
  } else if (req.body.username.length > USERNAME_MAX_LENGTH) {
    res.status(400).send({
      message: "Username too long.",
    });
  } else if (!req.body.username.match(USERNAME_REGEX)) {
    res.status(400).send({
      message: "Username must contain only alphanumeric characters.",
    });
  } else {
    next();
  }
};
