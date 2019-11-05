import { Sequelize } from "sequelize";
import User from "../src/generated/user";

describe("Constructing a new user", () => {
  const sequelize = new Sequelize("db", "root", "root", {
    host: "localhost",
    dialect: "postgres",
    logging: false
  });

  User.connect(sequelize);

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("with correct data", () => {
    test("should work", async () => {
      const user = await createUser();

      expect(user.email).toEqual("test@test.de");
    });
  });

  describe("with missing phoneNumber", () => {
    test("should work", async () => {
      const user = await createUser({ phoneNumber: null });

      expect(user.phoneNumber).toBeNull();
    });
  });

  type CreateUserData = {
    email?: string | null;
    password?: string | null;
    username?: string | null;
    phoneNumber?: string | null;
  };

  async function createUser(data: CreateUserData = {}): Promise<User> {
    if (data.email === undefined) data.email = "test@test.de";
    if (data.password === undefined) data.password = "abcd1234";
    if (data.username === undefined) data.username = "username";

    return User.create(data);
  }
});
