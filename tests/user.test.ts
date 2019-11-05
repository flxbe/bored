import { Sequelize } from "sequelize";
import User from "../src/generated/user";
import { createUser } from "../src/generated/user.test";

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
    it("should work", async () => {
      await expect(createUser()).resolves.not.toThrow();
    });
  });

  describe("with missing phoneNumber", () => {
    test("should work", async () => {
      const user = await createUser({ phoneNumber: null });

      expect(user.phoneNumber).toBeNull();
    });
  });

  describe("with missing email", () => {
    test("should fail", async () => {
      await expect(createUser({ email: null })).rejects.toThrow();
    });
  });
});
