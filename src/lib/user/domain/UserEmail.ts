export class UserEmail {
  public readonly value: string;

  constructor(value: string) {
    this.isValid(value);
    this.value = value;
  }

  isValid(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
