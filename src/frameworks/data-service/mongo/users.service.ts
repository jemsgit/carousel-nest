// mongo implemetation of IUsersService to fetch and work with user entity

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';

import { CreateUserDto } from '../../../core/dto/create-user.dto';
import { IUsersService } from '../../../core/users.service';
import { TypeOrNone } from 'src/types/shared';
import { RefreshToken } from './schemas/refresh-token.schema';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}
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

  async findUserToken(username: string): Promise<string | null> {
    const user = await this.userModel.findOne({ name: username });
    if (!user) {
      return null;
    }
    return await this.refreshTokenModel.findOne({ user: user._id });
  }

  async findOne(username: string): Promise<TypeOrNone<User>> {
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
