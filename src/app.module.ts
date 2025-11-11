import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './lib/user/infrastructure/user.module';
import { AuthModule } from './lib/auth/infrastructure/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
