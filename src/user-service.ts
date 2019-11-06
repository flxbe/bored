import Email from "./email";
import Password from "./password";

import User from "./generated/user";
import UserRepository from "./user-repository";

export type RegisterUserData = {
  email: Email;
  password: Password;
  username: string;
  phoneNumber?: string;
};

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(data: RegisterUserData): Promise<User> {
    const hash = await data.password.getHash();

    return this.userRepository.create({
      email: data.email,
      hash,
      username: data.username,
      phoneNumber: data.phoneNumber
    });
  }

  async login(email: Email, password: Password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    if (!(await password.validate(user.hash))) {
      throw new Error("Invalid password");
    }

    return user;
  }
}
