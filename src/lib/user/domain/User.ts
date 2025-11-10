import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';

export class User {
  userId: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;

  constructor(userId: UserId, name: UserName, email: UserEmail, password: UserPassword) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toJSON() {
    return {
      userId: this.userId.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
