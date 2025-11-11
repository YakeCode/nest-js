import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { Role, UserRole } from '../domain/UserRole';
import * as bcrypt from 'bcrypt';
import { User } from '../domain/User';
import { UserNotFoundError } from '../domain/UserNotFoundError';

export interface UserUpdateDto {
  userId: number;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(dto: UserUpdateDto): Promise<void> {
    const user = await this.repository.getById(new UserId(dto.userId));

    if (!user) throw new UserNotFoundError();

    if (dto.name) user.name = new UserName(dto.name);
    if (dto.email) user.email = new UserEmail(dto.email);
    if (dto.role) user.role = new UserRole(dto.role);
    if (dto.password) {
      user.password = new UserPassword(await bcrypt.hash(dto.password, 10));
    }

    await this.repository.update(user);
  }
}
