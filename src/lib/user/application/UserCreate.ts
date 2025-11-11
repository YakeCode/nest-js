import { ConflictException } from '@nestjs/common';
import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';
import { Role, UserRole } from '../domain/UserRole';
import * as bcrypt from 'bcrypt';

export interface UserCreateDto {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: Role;
}

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(dto: UserCreateDto): Promise<User> {
    const existingUser = await this.repository.findByEmail(new UserEmail(dto.email).value);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = new User(new UserName(dto.name), new UserEmail(dto.email), new UserPassword(hashedPassword), new UserRole(dto.role || Role.USER), dto.id ? new UserId(dto.id) : undefined);

    const newUser = await this.repository.create(user);
    return newUser;
  }
}
