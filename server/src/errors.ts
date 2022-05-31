import { IQuizError } from "./interfaces/interfaces";

export class BaseError extends Error implements IQuizError {
  status: number;
  details: string;

  constructor(status?: number, message?: string, details?: string) {
    super(message ? message : "An error occured in quiz service");
    this.status = status ? status : 500;
    this.details = details || "";
  }
}

export class QuizzesNotFound extends BaseError {
  constructor(details?: string) {
    super(500, "Could not retrieve quizzes", details);
  }
}

export class QuizNotFound extends BaseError {
  constructor(id: string) {
    super(500, `Could not retrieve quiz with id ${id}.`, "Quiz not found.");
  }
}

export class QuizNotUpdated extends BaseError {
  constructor(id: string) {
    super(500, `Could not update quiz with id ${id}.`, "");
  }
}

export class QuizNotDeleted extends BaseError {
  constructor(id: string) {
    super(500, `Could not delete quiz with id ${id}.`, "");
  }
}
