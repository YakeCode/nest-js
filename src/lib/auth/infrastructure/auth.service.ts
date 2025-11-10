import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserGetByEmail } from '../../user/application/UserGetByEmail';
import { User } from '../../user/domain/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userGetByEmail: UserGetByEmail,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
    const user = await this.userGetByEmail.run(email);
    if (user && (await bcrypt.compare(pass, user.password.value))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name.value, sub: user.userId.value };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
