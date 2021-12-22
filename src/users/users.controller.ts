import {
  Controller,
  Request,
  UseGuards,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

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
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('')
  async createUser(
    @Body()
    postData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
  ): Promise<User> {
    return this.usersService.create(postData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body()
    putData: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    },
  ): Promise<User> {
    return this.usersService.edit(id, putData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('')
  async updateOwnDetails(
    @Request() req,
    @Body()
    putData: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    },
  ): Promise<User> {
    return this.usersService.edit(req.user.id, putData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/assign/:id')
  async requestTeamAssignment(
    @Request() req,
    @Param('id') teamId: string,
  ): Promise<SentMessageInfo> {
    const managerMail = await (
      await this.usersService.findTeamManager(teamId)
    ).email;
    return this.usersService.sendConfirmationMail(
      managerMail,
      req.user.lastName,
      req.user.id,
    );
  }
}
