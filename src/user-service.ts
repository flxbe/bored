import { Models } from "./generated/models";

export default class UserService {
  private models: Models;

  constructor(models: Models) {
    this.models = models;
  }

  async register(email: string, password: string) {
    const user = await this.models.User.create({
      email,
      username: "username",
      password
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.models.User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
