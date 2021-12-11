import {
  Controller,
  Request,
  UseGuards,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createUser(
    @Body() postData: { email: string; password: string },
  ): Promise<User> {
    return this.usersService.create(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
