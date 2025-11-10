import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserNotFoundError } from '../domain/UserNotFoundError';
import { UserGetAll } from '../application/UserGetAll';
import { UserGetById } from '../application/UserGetById';
import { UserCreate } from '../application/UserCreate';
import { UserUpdate } from '../application/UserUpdate';
import { UserDelete } from '../application/UserDelete';

export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly userGetAll: UserGetAll,
    private readonly userGetById: UserGetById,
    private readonly userCreate: UserCreate,
    private readonly userUpdate: UserUpdate,
    private readonly userDelete: UserDelete,
  ) {}

  @Get()
  async getUsers() {
    const users = await this.userGetAll.run();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userGetById.run(id);
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
      throw error;
    }
  }

  @Post()
  async createUser(@Body() user: UserDto) {
    const newUser = await this.userCreate.run(user);
    return {
      success: true,
      data: newUser,
      code: 201,
    };
  }

  @Put(':id')
  async updateUser(@Body() user: UserDto) {
    await this.userUpdate.run(user);
    return {
      success: true,
      data: user,
      code: 204,
    };
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userDelete.run(id);
    return {
      success: true,
      code: 200,
    };
  }
}
