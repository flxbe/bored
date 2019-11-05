import User from "./generated/user";
import Email from "./email";
import Password from "./password";

export type RegisterUserData = {
  email: Email;
  password: Password;
  username?: string;
  phoneNumber?: string;
};

export default class UserService {
  async register(data: RegisterUserData): Promise<User> {
    const hash = await data.password.getHash();

    return await User.create({
      email: data.email.value,
      hash,
      username: data.username,
      phoneNumber: data.phoneNumber
    });
  }

  async login(email: Email, password: Password) {
    const user: User = await User.findOne({ where: { email: email.value } });

    if (!user) {
      throw new Error("User not found");
    }

    if (!(await password.validate(user.hash))) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
