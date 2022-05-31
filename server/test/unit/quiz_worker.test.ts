import {
  IQuiz,
  QuizCategory,
  QuizLevel,
} from "../../src/interfaces/interfaces";
import { QuizWorker } from "../../src/quiz_worker";
import { v4 as uuid4 } from "uuid";

const dbEmpty = async () => {
  const quizWorker = new QuizWorker();
  await quizWorker.deleteAll();
};

let quiz1_id: string | undefined;
let quiz: IQuiz;

/**
 * Empty the db before and after testing
 */
describe("QuizWorker", () => {
  beforeAll(async () => {
    await dbEmpty();
  });
  afterAll(async () => {
    await dbEmpty();
  });

  describe("QuizWorker Tests", () => {
    it("Should return 0 quizzes [listQuizzes]", async () => {
      let worker = new QuizWorker();
      let data = await worker.listQuizzes();
      expect(data?.length).toEqual(0);
    });

    //add one quiz
    it("should add [addQuiz] one quiz", async () => {
      const quiz1: IQuiz = {
        title: "History Quiz - 20th Century",
        category: QuizCategory.History,
        desc: "Answer these easy questions about the 20th century",
        level: QuizLevel.Easy,
        questions: [
          {
            _id: uuid4(),
            questionText:
              "What is the name of the first Nasa mission to the Moon?",
            score: 5,
            answers: [
              { _id: uuid4(), answerText: "Artemis", isCorrect: false },
              { _id: uuid4(), answerText: "Apollo 11", isCorrect: true },
              { _id: uuid4(), answerText: "Endevour 11", isCorrect: false },
              { _id: uuid4(), answerText: "Moonwalk 1", isCorrect: false },
            ],
          },
        ],
      };
      quiz = await new QuizWorker().addQuiz(quiz1);
      quiz1_id = quiz._id;
      expect(quiz.title).toEqual("History Quiz - 20th Century");
    });

    it("Should retrieve [listQuizzes] one quiz", async () => {
      if (quiz1_id) {
        let quizzesBefore = await new QuizWorker().listQuizzes();
        expect(quizzesBefore?.length).toEqual(1);
        expect(quizzesBefore[0].questions.length).toEqual(1);
      }
    });

    it("Should update [updateQuiz] one quiz", async () => {
      if (quiz1_id) {
        let quizzesBefore = await new QuizWorker().listQuizzes();
        expect(quizzesBefore?.length).toEqual(1);
        expect(quizzesBefore[0].questions.length).toEqual(1);

        quiz.title = quiz.title + "UPDATE";
        quiz.questions.push({
          _id: uuid4(),
          questionText:
            "What is the name of the last Nasa mission to the Moon?",
          score: 5,
          answers: [
            { _id: uuid4(), answerText: "Artemis", isCorrect: false },
            { _id: uuid4(), answerText: "Apollo 11", isCorrect: false },
            { _id: uuid4(), answerText: "Endevour 11", isCorrect: false },
            { _id: uuid4(), answerText: "Apollo 17", isCorrect: true },
          ],
        });
        let worker = new QuizWorker();
        let data = await worker.updateQuiz(quiz);
        expect(data._id).toEqual(quiz1_id);
        expect(data.title).toEqual(quiz.title);
        expect(data.questions.length).toEqual(2);
      }
    });

    it("Should retrieve [getQuizById] one quiz", async () => {
      if (quiz1_id) {
        let quizById = await new QuizWorker().getQuizById(quiz1_id);
        expect(quizById.questions.length).toEqual(2);
        expect(quizById.questions[1].answers.length).toEqual(4);
      }
    });

    it("Should delete one [deleteQuiz] quiz and have 0 quizzes in db", async () => {
      if (quiz1_id) {
        let quizzesBefore = await new QuizWorker().listQuizzes();
        expect(quizzesBefore?.length).toEqual(1);

        let worker = new QuizWorker();
        let data = await worker.deleteQuiz(quiz1_id);
        expect(data).toEqual(quiz1_id);

        let quizzes = await new QuizWorker().listQuizzes();
        expect(quizzes?.length).toEqual(0);
      }
    });
  });
});
