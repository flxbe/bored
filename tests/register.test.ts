import { Sequelize } from "sequelize";
import User from "../src/generated/user";
import UserService from "../src/user-service";

describe("Creating a user", () => {
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

  describe("with valid credentials", () => {
    test("should work", async () => {
      const service = new UserService();
      const data = {
        email: "test@test.de",
        password: "abcd1234",
        username: "test"
      };

      await service.register(data);

      await service.login(data.email, data.password);
    });
  });
});
