export enum QuizCategory {
  History,
  Math,
  Chemistry,
  French,
}

export enum QuizLevel {
  Easy,
  Medium,
  Advanced,
  Expert,
}

export interface IEntity {
  _id?: string;
}

export interface IAnswer extends IEntity {
  answerText: string;
  isCorrect: boolean;
}
export interface IQuestion extends IEntity {
  questionText: string;
  score: number;
  answers: IAnswer[];
}

export interface IQuiz extends IEntity {
  title: string;
  category: QuizCategory;
  desc: string;
  level: QuizLevel;
  questions: IQuestion[];
}

export interface IQuizError {
  status: number;
  details: string;
}
