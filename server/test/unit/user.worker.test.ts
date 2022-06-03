import { IUser, UserRole } from "../../src/interfaces/interfaces";
import { UserWorker } from "../../src/controllers/user_worker";

const dbEmpty = async () => {
  const userWorker = new UserWorker();
  await userWorker.deleteAll();
};

let user1_id: string | undefined;
let user: IUser;

/**
 * Empty the db before and after testing
 */
describe("UserWorker", () => {
  beforeAll(async () => {
    await dbEmpty();
  });
  afterAll(async () => {
    await dbEmpty();
  });

  describe("UserWorker Tests", () => {
    it("Should return 0 users [listUsers]", async () => {
      let worker = new UserWorker();
      let data = await worker.listUsers();
      expect(data?.length).toEqual(0);
    });

    //add one user
    it("should add [addUser] one user", async () => {
      const user1: IUser = {
        username: "test1",
        password: "test1pwd",
        role: UserRole.Admin,
      };
      user = await new UserWorker().addUser(user1);
      user1_id = user._id;
      expect(user.username).toEqual("test1");
    });

    it("Should retrieve [listUsers] one user", async () => {
      if (user1_id) {
        let usersBefore = await new UserWorker().listUsers();
        expect(usersBefore?.length).toEqual(1);
      }
    });

    it("Should update [updateUser] one user", async () => {
      if (user1_id) {
        let usersBefore = await new UserWorker().listUsers();
        expect(usersBefore?.length).toEqual(1);

        user.username = user.username + "UPDATE";
        user.password = "updatedPassword";

        let worker = new UserWorker();
        let data = await worker.updateUser(user);
        expect(data._id).toEqual(user1_id);
        expect(data.username).toEqual(user.username);
        expect(data.password).toEqual(user.password);
      }
    });

    it("Should retrieve [getUserById] one user", async () => {
      if (user1_id) {
        let userById = await new UserWorker().getUserById(user1_id);
        expect(userById._id).toEqual(user1_id);
      }
    });

    it("Should retrieve [getUserByUsername] one user", async () => {
      if (user1_id && user) {
        let userByUsername = await new UserWorker().getUserByUsername(
          user.username
        );
        expect(userByUsername._id).toEqual(user1_id);
      }
    });

    it("Should retrieve [getUserByUsername] no user", async () => {
      if (user1_id && user) {
        let userByUsername = await new UserWorker().getUserByUsername(
          "nosuchuser"
        );
        expect(userByUsername).toEqual(null);
      }
    });

    it("Should delete one [deleteUser] user and have 0 users in db", async () => {
      if (user1_id) {
        let usersBefore = await new UserWorker().listUsers();
        expect(usersBefore?.length).toEqual(1);

        let worker = new UserWorker();
        let data = await worker.deleteUser(user1_id);
        expect(data).toEqual(user1_id);

        let users = await new UserWorker().listUsers();
        expect(users?.length).toEqual(0);
      }
    });
  });
});
