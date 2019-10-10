const Sequelize = require("sequelize");
const UserModel = require("../src/generated/user");

describe("Creating a user", () => {
  const sequelize = new Sequelize("db", "root", "root", {
    host: "localhost",
    dialect: "postgres",
    logging: false
  });

  const User = UserModel(sequelize);

  beforeAll(async () => {
    await sequelize.authenticate();
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("should save it to the database", async () => {
    await User.create({
      userName: "therealdonaldtrump",
      firstName: "Donald",
      lastName: "Trump"
    });

    const users = await User.findAll();

    expect(users).toHaveLength(1);
  });

  test("should save the username", async () => {
    await User.create({
      userName: "therealdonaldtrump",
      firstName: "Donald",
      lastName: "Trump"
    });

    const users = await User.findAll({
      where: { userName: "therealdonaldtrump" }
    });

    expect(users).toHaveLength(1);
  });
});
