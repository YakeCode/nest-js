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
  id: number;
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
}

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(dto: UserUpdateDto): Promise<void> {
    const user = await this.repository.getById(new UserId(dto.id));

    if (!user) throw new UserNotFoundError();

    const newUser = new User(user.userId, dto.name ? new UserName(dto.name) : user.name, dto.email ? new UserEmail(dto.email) : user.email, dto.password ? new UserPassword(await bcrypt.hash(dto.password, 10)) : user.password, dto.role ? new UserRole(dto.role) : user.role);

    await this.repository.update(newUser);
  }
}
