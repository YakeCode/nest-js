export class UserId {
  value: number;
  constructor(value: number) {
    this.isValid(value);
    this.value = value;
  }

  isValid(value: number) {
    if (typeof value !== 'number') throw new Error('Invalid user id, must be a number');
    if (value <= 0) throw new Error('user id must be greater than 0');
  }
}
