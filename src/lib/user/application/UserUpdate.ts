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

export class UserUpdate {
  constructor(private repository: UserRepository) {}

  async run(userDto: UserDto): Promise<void> {
    const userToUpdate = new User(new UserId(userDto.id), new UserName(userDto.name), new UserEmail(userDto.email), new UserPassword(userDto.password));
    const user = await this.repository.update(userToUpdate);
    return user;
  }
}
