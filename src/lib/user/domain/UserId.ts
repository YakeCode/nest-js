export class UserId {
  private static currentId: number = 1;
  readonly value: number;

  constructor(value?: number) {
    if (value === undefined || value === null) {
      this.value = UserId.currentId++;
    } else {
      this.isValid(value);
      this.value = value;
    }
  }

  private isValid(value: number) {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new Error('Invalid user id, must be an integer.');
    }
    if (value <= 0) {
      throw new Error('User id must be a positive integer.');
    }
  }
}
