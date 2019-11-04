const assert = require("assert");

module.exports = class UserService {
  constructor(models) {
    this.models = models;
  }

  async register(email, password) {
    const user = await this.models.User.create({
      email,
      username: "username",
      password
    });

    return user;
  }

  async login(email, password) {
    const user = await this.models.User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  }
};
