import { MemoryUserRepository } from 'src/lib/user/infrastructure/MemoryUserRepository';
import { UserGetAll } from 'src/lib/user/application/UserGetAll';
import { UserGetById } from 'src/lib/user/application/UserGetById';
import { UserCreate } from 'src/lib/user/application/UserCreate';
import { UserUpdate } from 'src/lib/user/application/UserUpdate';
import { UserDelete } from 'src/lib/user/application/UserDelete';

const UserRepository = new MemoryUserRepository();

export const serviceContainer = {
  user: {
    getAll: new UserGetAll(UserRepository),
    getById: new UserGetById(UserRepository),
    create: new UserCreate(UserRepository),
    update: new UserUpdate(UserRepository),
    delete: new UserDelete(UserRepository),
  },
};
