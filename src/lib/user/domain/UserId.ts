export class UserId {
  private currentId: number = 100;
  value: number;
  constructor(value?: number) {
    if (!value) {
      value = this.currentId++;
    }
    this.value = value;
  }

  isValid(value: number) {
    if (typeof value !== 'number') throw new Error('Invalid user id, must be a number');
    if (value <= 0) throw new Error('user id must be greater than 0');
  }
}
