export class UserPassword {
  public readonly value: string;

  constructor(value: string) {
    this.isValid(value);
    this.value = value;
  }

  private isValid(value: string) {
    if (value.length < 3) {
      throw new Error('Password must be at least 8 characters long');
    }
  }
}
