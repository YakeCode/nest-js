import { UserRepository } from '../domain/UserRepository';

export class UserGetByEmail {
  constructor(private readonly repository: UserRepository) {}

  async run(email: string) {
    return this.repository.findByEmail(email);
  }
}
