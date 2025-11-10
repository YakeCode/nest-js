import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../user/infrastructure/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ENV } from '../../../config/env';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: ENV.JWT_PRIVATE_KEY,
      publicKey: ENV.JWT_PUBLIC_KEY,
      signOptions: { expiresIn: '1h', algorithm: 'RS256' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [PassportModule, JwtModule, AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
