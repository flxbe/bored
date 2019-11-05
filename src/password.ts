import { hash, compare } from "bcrypt";

export default class Password {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  async getHash(): Promise<string> {
    return hash(this.value, 2);
  }

  async validate(hash: string): Promise<boolean> {
    return compare(this.value, hash);
  }
}
