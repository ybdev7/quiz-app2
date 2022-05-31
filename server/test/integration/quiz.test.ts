import { agent as _request, SuperAgentTest } from "supertest";
import { Server } from "http";
import { quizServer } from "../../src/quiz_server";
import {
  IQuiz,
  QuizCategory,
  QuizLevel,
} from "../../src/interfaces/interfaces";
import { v4 as uuid4 } from "uuid";
import { QuizWorker } from "../../src/quiz_worker";

let agent: SuperAgentTest;
let server: Server;

describe("quizzez routes", () => {
  let quiz1: IQuiz;
  let quiz2: IQuiz;

  //init db for tests
  beforeAll(async () => {
    await new QuizWorker().deleteAll();
    const quiz: IQuiz = {
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
    quiz1 = await new QuizWorker().addQuiz(quiz);

    quiz.title = "History Quiz - 20th Century II";
    quiz2 = await new QuizWorker().addQuiz(quiz);
  });

  //restart server
  beforeEach((done) => {
    server = new quizServer().get().listen(4000, () => {
      agent = _request(server);
      done();
    });
  });

  let id1: string | undefined;

  it("GET quiz/test - Should return status 200", async () => {
    const { body: data } = await agent.get("/quiz/test").expect(200);
    expect(data).toHaveProperty("message");
  });

  it("GET /quiz - Should return 2 quizzes and status 200", async () => {
    const { body: data } = await agent.get("/quiz").expect(200);
    expect(data.length).toEqual(2);
    (data as IQuiz[]).map((item) => {
      console.log(item.title);
    });
  });

  it("POST /create -  responds with the newly created quiz", async () => {
    const newQuiz: IQuiz = {
      title: "History Quiz - 20th Century III",
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

    const res = await agent.post("/quiz/").send(newQuiz);

    //correct response will have these properties
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("level");
    expect(res.body).toHaveProperty("desc");
    expect(res.body).toHaveProperty("questions");
    expect(res.body).toHaveProperty("_id");
    expect(res.statusCode).toBe(200);
    id1 = (res.body as IQuiz)._id;
  });

  it("Get /id=<id> - responds with the requested quiz", async () => {
    if (quiz1) {
      const res = await agent.get("/quiz/id=" + quiz1._id).expect(200);
      expect((res.body as IQuiz).title).toEqual("History Quiz - 20th Century");
    }
  });

  it("PUT - update quiz", async () => {
    if (quiz2) {
      quiz2.title = "UPDATE" + quiz2.title;
      const res = await agent.put("/quiz/").send(quiz2).expect(200);
      expect((res.body as IQuiz).title).toEqual(quiz2.title);
    }
  });

  it("DELETE - delete quiz", async () => {
    if (quiz2) {
      const res = await agent.delete("/quiz/id=" + quiz2._id).expect(200);
      expect(res.body.message).toEqual("ok");
    }
  });

  afterEach((done) => {
    server.close(done);
  });

  //stop server
  afterAll(async () => {
    await new QuizWorker().deleteAll();
    server.close();
  });
});
