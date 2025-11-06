import { UserRepository } from '../domain/UserRepository';
import { UserId } from '../domain/UserId';

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<void> {
    const userId = new UserId(id);
    await this.repository.delete(userId);
  }
}
