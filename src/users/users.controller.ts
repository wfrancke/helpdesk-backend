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
  @Get('id/:id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
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
  @Put()
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
  @Put('password')
  async updatePassword(
    @Request() req,
    @Body()
    putData: {
      password: string;
    },
  ): Promise<User> {
    return this.usersService.edit(req.user.id, putData);
  }

  @UseGuards(JwtAuthGuard)
  @Put('specialty')
  async updateSpecialty(
    @Request() req,
    @Body()
    putData: {
      specialty: string[];
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
  @Post('assign')
  async requestTeamAssignment(
    @Request() req,
    @Body()
    postData: {
      teamId: string;
    },
  ): Promise<string> {
    const managerMail = (
      await this.usersService.findTeamManager(postData.teamId)
    ).email;
    const response = await this.usersService.sendConfirmationMail(
      managerMail,
      req.user.lastName,
      req.user.id,
      postData.teamId,
    );
    return response.response;
  }

  @Get('confirm/:userId/to/:teamId')
  async confirmUser(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
  ): Promise<User> {
    return this.usersService.setEmployee(teamId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('team')
  async getTeamMembers(@Request() req): Promise<User[]> {
    return this.usersService.findTeamMembers(req.user.teamId);
  }
}
