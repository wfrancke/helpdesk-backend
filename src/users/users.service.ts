import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { User, Role } from '../interfaces/user.interface';
import { CreateUserDto, EditUserDetailsDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      role: Role.User,
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
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      editUserDetailsDto,
    );
    return updatedUser.save();
  }

  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }
}
