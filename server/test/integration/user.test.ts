import { agent as _request, SuperAgentTest } from "supertest";
import { Server } from "http";
import { quizServer } from "../../src/quiz_server";
import {
  IUser,
  IUserCredentials,
  UserRole,
} from "../../src/interfaces/interfaces";
import { UserWorker } from "../../src/controllers/user_worker";

let agent: SuperAgentTest;
let server: Server;

describe("users routes", () => {
  let user1: IUser;
  let user2: IUser;

  //init db for tests
  beforeAll(async () => {
    await new UserWorker().deleteAll();
    const user: IUser = {
      username: "testuser1",
      password: "test1pwd",
      role: UserRole.Editor,
    };
    user1 = await new UserWorker().addUser(user);

    user.username = "testuser2";
    user.password = "testuse2pwd";
    user2 = await new UserWorker().addUser(user);
  });

  //restart server
  beforeEach((done) => {
    server = new quizServer().get().listen(4000, () => {
      agent = _request(server);
      done();
    });
  });

  let id1: string | undefined;

  it("GET user/test - Should return status 200", async () => {
    const { body: data } = await agent.get("/user/test").expect(200);
    expect(data).toHaveProperty("message");
  });

  it("GET /user - Should return 2 users and status 200", async () => {
    const { body: data } = await agent.get("/user").expect(200);
    expect(data.length).toEqual(2);
    (data as IUser[]).map((item) => {
      console.log(item.username);
    });
  });

  it("POST /create -  responds with the newly created user", async () => {
    const newUser: IUser = {
      username: "testuser3",
      password: "testuser3pwd",
      role: UserRole.Viewer,
    };

    const res = await agent.post("/user/").send(newUser);

    //correct response will have these properties
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("password");
    expect(res.body).toHaveProperty("role");
    expect(res.body).toHaveProperty("_id");
    expect(res.statusCode).toBe(200);
    id1 = (res.body as IUser)._id;
  });

  it("POST /create -  responds with user already exists", async () => {
    const newUser: IUser = {
      username: "testuser3",

      password: "testuser3pwd",
      role: UserRole.Viewer,
    };

    const res = await agent.post("/user/").send(newUser);

    //correct response will have these properties
    expect(res.body).toHaveProperty("message");
    expect(res.statusCode).toBe(400);
  });

  it("POST /create -  responds with user must contain only alphanumeric characters", async () => {
    const newUser: IUser = {
      username: "_testuser3",

      password: "_testuser3pwd",
      role: UserRole.Viewer,
    };

    const res = await agent.post("/user/").send(newUser);

    //correct response will have these properties
    expect(res.body).toHaveProperty("message");
    expect(res.statusCode).toBe(400);
  });

  it("Get /id=<id> - responds with the requested user", async () => {
    if (user1) {
      const res = await agent.get("/user/id=" + user1._id).expect(200);
      expect((res.body as IUser).username).toEqual("testuser1");
    }
  });

  it("PUT - update user", async () => {
    if (user2) {
      user2.username = "UPDATE" + user2.username;
      const res = await agent.put("/user/").send(user2).expect(200);
      expect((res.body as IUser).username).toEqual(user2.username);
    }
  });

  it("DELETE - delete user", async () => {
    if (user2) {
      const res = await agent.delete("/user/id=" + user2._id).expect(200);
      expect(res.body.message).toEqual("ok");
    }
  });

  it("POST /signin -  responds with token", async () => {
    const newUser: IUserCredentials = {
      username: "testuser3",
      password: "testuser3pwd",
    };

    const res = await agent.post("/user/signin").send(newUser);

    //correct response will have these properties
    expect(res.body).toHaveProperty("username");
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("role");
    expect(res.body).toHaveProperty("_id");
    expect(res.statusCode).toBe(200);
  });

  it("POST /signin with wrong password -  responds with error message", async () => {
    const newUser: IUserCredentials = {
      username: "testuser3",
      password: "testuser3pwdwrong",
    };

    const res = await agent.post("/user/signin").send(newUser);

    //correct response will have these properties
    expect(res.body).toHaveProperty("message");
    expect(res.statusCode).toBe(500);
  });

  it("POST /signin with wrong username -  responds with error message", async () => {
    const newUser: IUserCredentials = {
      username: "testuser3wrong",
      password: "testuser3pwdwrong",
    };

    const res = await agent.post("/user/signin").send(newUser);

    //correct response will have these properties
    expect(res.body).toHaveProperty("message");
    expect(res.statusCode).toBe(500);
  });

  afterEach((done) => {
    server.close(done);
  });

  //stop server
  afterAll(async () => {
    await new UserWorker().deleteAll();
    server.close();
  });
});
