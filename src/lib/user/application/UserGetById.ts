import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserNotFoundError } from '../domain/UserNotFoundError';

export class UserGetById {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<User> {
    const userId = new UserId(id);
    const user = await this.repository.getById(userId);
    if (!user) throw new UserNotFoundError();
    return user;
  }
}
