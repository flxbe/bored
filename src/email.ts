export default class Email {
  private email: string;

  constructor(email: string) {
    if (!email.includes("@")) throw new Error(`Invalid email: ${email}`);

    this.email = email;
  }

  get value(): string {
    return this.email;
  }
}
