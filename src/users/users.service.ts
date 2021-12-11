import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
