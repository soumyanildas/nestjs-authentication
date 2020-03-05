import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async find(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      email
    }).exec();
    return user;
  }
}
