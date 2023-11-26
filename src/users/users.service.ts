import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from '../frameworks/data-service/mongo/schemas/user.schema';

import { CreateUserDto } from '../core/dto/create-user.dto';

type MongoResponse<T> = Promise<T | null | undefined>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      refresh_token: '',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      refresh_token: '',
    },
  ];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async findOne(username: string): MongoResponse<User> {
    return this.userModel.findOne({ name: username });
  }

  async updateRefresh(
    username: string,
    refresh_token: string,
  ): Promise<User | undefined> {
    let user = this.users.find((user) => user.username === username);
    if (!user) {
      return;
    }
    user.refresh_token = refresh_token;
  }
}
