export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class UserRole {
  readonly value: Role;

  constructor(value: Role) {
    this.isValid(value);
    this.value = value;
  }

  private isValid(value: Role) {
    if (!Object.values(Role).includes(value)) {
      throw new Error('Invalid role');
    }
  }
}
