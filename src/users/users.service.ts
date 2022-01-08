import { Inject, Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, Role } from '../interfaces/user.interface';
import { CreateUserDto, EditUserDetailsDto } from '../dto/user.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
    private mailService: MailService,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltRounds);
    const createdUser = new this.userModel({
      role: Role.User,
      password: hash,
      ...createUserDto,
    });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async edit(
    id: string,
    editUserDetailsDto: EditUserDetailsDto,
  ): Promise<User> {
    if (editUserDetailsDto.password) {
      const saltRounds = 10;
      const hash = await bcrypt.hash(editUserDetailsDto.password, saltRounds);
      const updatedUser = await this.userModel.findByIdAndUpdate(id, {
        password: hash,
      });
      return updatedUser.save();
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      editUserDetailsDto,
    );
    return updatedUser.save();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async findTeamManager(teamId: string): Promise<User> {
    return this.userModel.findOne({ teamId: teamId, role: Role.Manager });
  }

  async sendConfirmationMail(
    email: string,
    name: string,
    userId: string,
    teamId: string,
  ): Promise<SentMessageInfo> {
    return this.mailService.sendUserConfirmation(email, name, userId, teamId);
  }

  async setEmployee(teamId: string, userId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, {
      teamId,
      role: Role.Employee,
    });
  }

  async findEmployees(requesterId: string): Promise<User[]> {
    return this.userModel.find({
      role: { $ne: Role.User },
      _id: { $ne: requesterId },
    });
  }

  async findTeamMembers(teamId: string): Promise<User[]> {
    return this.userModel.find({ teamId: teamId, role: Role.Employee });
  }
}
