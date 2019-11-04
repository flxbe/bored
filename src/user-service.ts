import User from "./generated/user";

export default class UserService {
  async register(email: string, password: string) {
    const user = await User.create({
      email,
      username: "username",
      password
    });

    return user;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
