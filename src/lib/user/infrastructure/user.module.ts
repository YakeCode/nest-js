import { Module, Provider } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserGetAll } from '../application/UserGetAll';
import { UserGetById } from '../application/UserGetById';
import { UserCreate } from '../application/UserCreate';
import { UserUpdate } from '../application/UserUpdate';
import { UserDelete } from '../application/UserDelete';
import { UserRepository } from '../domain/UserRepository';
import { UserGetByEmail } from '../application/UserGetByEmail';
import { PostgresUserRepository } from './PostgresUserRepository';
import { DatabaseModule } from 'src/database/database.module';

const userRepositoryProvider = {
  provide: 'UserRepository',
  useClass: PostgresUserRepository,
};

const userUseCases: Provider[] = [
  UserGetAll,
  UserGetById,
  UserCreate,
  UserUpdate,
  UserDelete,
  UserGetByEmail,
].map((useCase) => ({
  provide: useCase,
  useFactory: (userRepository: UserRepository) => new useCase(userRepository),
  inject: ['UserRepository'],
}));

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [userRepositoryProvider, ...userUseCases],
  exports: [userRepositoryProvider, UserGetByEmail],
})
export class UserModule {}
