import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import User from "../src/generated/user";
import { createUser } from "../src/generated/user.test";

describe("Constructing a new user", () => {
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

  describe.skip("with an invalid email", () => {
    test("should fail", async () => {
      await expect(createUser({ email: "invalid mail" })).rejects.toThrow();
    });
  });

  describe.skip("with an empty email", () => {
    test("should fail", async () => {
      await expect(createUser({ email: "" })).rejects.toThrow();
    });
  });
});
