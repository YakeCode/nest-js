import { UserRepository } from '../domain/UserRepository';

import { User } from '../domain/User';
import { UserId } from '../domain/UserId';

export class MemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: UserId): Promise<User | null> {
    const user = this.users.find((user) => user.userId.value === id.value) || null;
    return user;
  }
  async create(user: User): Promise<User> {
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
}
