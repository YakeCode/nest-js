import { User } from './User';
import { UserId } from './UserId';

export interface UserRepository {
  getAll(): Promise<User[]>;
  getById(userId: UserId): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<void>;
  delete(userId: UserId): Promise<void>;
}
