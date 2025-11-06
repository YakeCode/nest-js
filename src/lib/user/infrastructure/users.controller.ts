import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { serviceContainer } from '../../shared/infrastructure/ServiceContainer';
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { error } from 'console';

export interface UserDto {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  @Get()
  async getUsers() {
    const users = await serviceContainer.user.getAll.run();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await serviceContainer.user.getById.run(id);
      if (!user) throw new UserNotFoundError();
      return {
        success: true,
        data: user,
        code: 200,
      };
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return {
          success: false,
          message: error.message,
          code: 404,
        };
      }
    }

    throw error;
  }

  @Post()
  async createUser(@Body() user: UserDto) {
    const newUser = await serviceContainer.user.create.run(user);
    return {
      success: true,
      data: newUser,
      code: 201,
    };
  }

  @Put(':id')
  async updateUser(@Body() user: UserDto) {
    await serviceContainer.user.update.run(user);
    return {
      success: true,
      data: user,
      code: 204,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await serviceContainer.user.delete.run(id);
    return {
      success: true,
      code: 200,
    };
  }
}
