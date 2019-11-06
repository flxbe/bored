import { hash, compare } from "bcrypt";

export type PasswordHash = string;
export default class Password {
  constructor(private value: string) {
    this.value = value;
  }

  async getHash(): Promise<PasswordHash> {
    return hash(this.value, 2);
  }

  async validate(hash: PasswordHash): Promise<boolean> {
    return compare(this.value, hash);
  }
}
