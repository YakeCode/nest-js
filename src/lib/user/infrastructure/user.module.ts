import { Module, Provider } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserGetAll } from '../application/UserGetAll';
import { UserGetById } from '../application/UserGetById';
import { UserCreate } from '../application/UserCreate';
import { UserUpdate } from '../application/UserUpdate';
import { UserDelete } from '../application/UserDelete';
import { UserRepository } from '../domain/UserRepository';
import { MemoryUserRepository } from './MemoryUserRepository';

const userRepositoryProvider = {
  provide: 'UserRepository',
  useClass: MemoryUserRepository,
};

const userUseCases: Provider[] = [UserGetAll, UserGetById, UserCreate, UserUpdate, UserDelete].map((useCase) => ({
  provide: useCase,
  useFactory: (userRepository: UserRepository) => new useCase(userRepository),
  inject: ['UserRepository'],
}));

@Module({
  controllers: [UsersController],
  providers: [userRepositoryProvider, ...userUseCases],
})
export class UserModule {}
