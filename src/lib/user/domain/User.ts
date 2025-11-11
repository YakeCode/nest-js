import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserEmail } from './UserEmail';
import { UserPassword } from './UserPassword';
import { UserRole } from './UserRole';

export class User {
  userId: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;

  constructor(name: UserName, email: UserEmail, password: UserPassword, role: UserRole, userId?: UserId) {
    this.userId = userId ?? new UserId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }

  toJSON() {
    return {
      userId: this.userId.value,
      name: this.name.value,
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
    };
  }
}
