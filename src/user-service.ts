import User from "./generated/user";

export type RegisterUserData = {
  email: string;
  password: string;
  username?: string;
  phoneNumber?: string;
};

export default class UserService {
  async register(data: RegisterUserData): Promise<User> {
    const user = await User.create(data);
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
