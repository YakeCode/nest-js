import { UserRepository } from '../domain/UserRepository';
import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserEmail } from '../domain/UserEmail';
import { UserPassword } from '../domain/UserPassword';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
}

export class UserCreate {
  constructor(private repository: UserRepository) {}

  async run(dto: UserDto): Promise<User> {
    const user = new User(new UserId(dto.id), new UserName(dto.name), new UserEmail(dto.email), new UserPassword(dto.password));
    const newUser = await this.repository.create(user);
    return newUser;
  }
}
