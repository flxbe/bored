import { EntityRepository, EntityManager } from "typeorm";
import User from "./generated/user";
import Email from "./email";
import { PasswordHash } from "./password";

export type CreateUserData = {
  email: Email;
  hash: PasswordHash;
  username: string;
  phoneNumber?: string;
};

@EntityRepository()
export default class UserRepository {
  constructor(private manager: EntityManager) {}

  create(data: CreateUserData) {
    const user = new User();
    user.email = data.email.value;
    user.hash = data.hash;
    user.username = data.username;
    user.phoneNumber = data.phoneNumber;

    return this.manager.save(user);
  }

  findByEmail(email: Email) {
    return this.manager.findOne(User, { email: email.value });
  }
}
