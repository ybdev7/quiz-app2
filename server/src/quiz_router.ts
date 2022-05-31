import express, { NextFunction, Request, Response } from "express";
import {
  BaseError,
  QuizNotDeleted,
  QuizNotFound,
  QuizNotUpdated,
  QuizzesNotFound,
} from "./errors";
import { IQuiz } from "./interfaces/interfaces";
import { QuizWorker } from "./quiz_worker";
import { quizWorker } from "./quizDAL";

//create router
const quizRouter = express.Router();

/**
 * Logs start of endpoint logic
 */
quizRouter.use((req, res, next) => {
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
quizRouter.get("/test", (req, res, next) => {
  res.json({ message: "Quiz router test::working!" });
  next();
});

/**
 * Responds with an error
 */
quizRouter.get("/error", (req, res, next) => {
  try {
    throw new BaseError();
  } catch (err) {
    next(err);
  }
  next();
});

/**
 * GET all quizzes
 */
quizRouter.get("/", async (req, res, next) => {
  try {
    //const quizWorker: QuizWorker = new QuizWorker();
    const quizzes: IQuiz[] = await quizWorker.listQuizzes();
    res.json(quizzes);
    next();
  } catch (err) {
    next(new QuizzesNotFound((err as any).stack));
  }
});

/**
 * Get one quiz by id.
 * Throws a QuizNotFound error in case su such id exists
 */
quizRouter.get("/id=:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    // const quizWorker: QuizWorker = new QuizWorker();
    const quiz: IQuiz = await quizWorker.getQuizById(id);
    if (!quiz) {
      throw new QuizNotFound(id);
    }
    res.json(quiz);
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Add a new quiz
 */
quizRouter.post("/", async (req, res, next) => {
  try {
    // const quizWorker: QuizWorker = new QuizWorker();
    const quiz: IQuiz = await quizWorker.addQuiz(req.body);
    res.json(quiz);
    next();
  } catch (err) {
    next(new BaseError(500, "Failed to add quiz", (err as any).stack)); //tbd
  }
});

/**
 * Update existing quiz
 */
quizRouter.put("/", async (req, res, next) => {
  try {
    // const quizWorker: QuizWorker = new QuizWorker();
    const quiz: IQuiz = await quizWorker.updateQuiz(req.body);
    res.json(quiz);
  } catch (err) {
    next(new QuizNotUpdated(req.body._id));
  }
});

quizRouter.delete("/id=:id", async (req, res, next) => {
  console.log("DELETE /quiz", req.body);
  try {
    // const quizWorker: QuizWorker = new QuizWorker();
    await quizWorker.deleteQuiz(req.params.id);
    res.send({ message: "ok" });
  } catch (err) {
    next(new QuizNotDeleted(req.body._id));
  }
});

/**
 * Logs end of endpoint logic
 */
quizRouter.use((req, res, next) => {
  //log end of each request
  console.log(`<<END ${req.method} ${req.baseUrl}${req.url} `);
  next();
});

/**Error handling */
quizRouter.use(
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
module.exports = quizRouter;
