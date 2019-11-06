import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import User from "../src/generated/user";
import Email from "../src/email";
import Password from "../src/password";
import UserRepository from "../src/user-repository";
import UserService from "../src/user-service";

describe("Creating a user", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({
      type: "mysql",
      host: "localhost",
      username: "root",
      password: "root",
      database: "db",
      synchronize: true,
      logging: false,
      entities: [User]
    });
  });

  beforeEach(async () => {
    await connection.synchronize();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("with valid credentials", () => {
    test("should work", async () => {
      const repository = connection.getCustomRepository(UserRepository);

      const service = new UserService(repository);
      const data = {
        email: new Email("test@test.de"),
        password: new Password("abcd1234"),
        username: "test"
      };

      await service.register(data);

      await service.login(data.email, data.password);
    });
  });
});
