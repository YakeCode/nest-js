import { UserRepository } from '../domain/UserRepository';

import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { Role, UserRole } from '../domain/UserRole';

export class MemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private currentId: number = this.users.length + 1;

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: UserId): Promise<User | null> {
    const user = this.users.find((user) => user.userId.value === id.value) || null;
    return user;
  }
  async create(user: User): Promise<User> {
    user.userId = new UserId(this.currentId++);
    user.role = new UserRole(Role.USER);
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.userId.value === user.userId.value);
    if (index === -1) throw new Error('User not found');
    this.users[index] = user;
  }

  async delete(id: UserId): Promise<void> {
    const index = this.users.findIndex((u) => u.userId.value === id.value);
    this.users.splice(index, 1);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email.value === email) || null;
    return user;
  }
}
