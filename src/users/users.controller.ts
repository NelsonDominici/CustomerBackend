import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  GetUsers() {
    const result = this.usersService.findAll();
    return result;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const result = this.usersService.findById(id);
    return result;
  }

  @Post('register')
  createUsers(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('token') token: string,
  ) {
    return this.usersService.createUsers(username, email, password, token);
  }

  @Post('login')
  logUser(@Body('email') email: string, @Body('password') password: string) {
    return this.usersService.logUser(email, password);
  }
}
