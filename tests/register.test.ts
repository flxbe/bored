import { Sequelize } from "sequelize";
import UserModel from "../src/generated/user";
import UserService from "../src/user-service";

describe("Creating a user", () => {
  const sequelize = new Sequelize("db", "root", "root", {
    host: "localhost",
    dialect: "postgres",
    logging: false
  });

  const Models = {
    User: UserModel(sequelize)
  };

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("with valid credentials", () => {
    test("should work", async () => {
      const service = new UserService(Models);

      await service.register("test@test.de", "abcd1234");

      await service.login("test@test.de", "abcd1234");
    });
  });
});
