import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserEmail } from './UserEmail';

export class User {
  userId: UserId;
  name: UserName;
  email: UserEmail;
  constructor(userId: UserId, name: UserName, email: UserEmail) {
    this.userId = userId;
    this.name = name;
    this.email = email;
  }

  toJSON() {
    return {
      userId: this.userId.value,
      name: this.name.value,
      email: this.email.value,
    };
  }
}
