// mongo implemetation of IUsersService to fetch and work with user entity

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { User, UserDocument } from './schemas/user.schema';

import { CreateUserDto } from '../../../core/dto/create-user.dto';
import { IUsersService } from '../../../core/users.service';
import { TypeOrNone } from 'src/types/shared';
import { RefreshTokenDocument } from './schemas/refresh-token.schema';

// implementation of IUsersService for mongodb
// we pass models as arguments and create instance of usersService explicit
// because we cant inject service into mongo-data-service

export class UsersService implements IUsersService {
  private userModel: Model<UserDocument>;
  private refreshTokenModel: Model<RefreshTokenDocument>;

  constructor(
    userModel: Model<UserDocument>,
    refreshTokenModel: Model<RefreshTokenDocument>,
  ) {
    this.userModel = userModel;
    this.refreshTokenModel = refreshTokenModel;
  }
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

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdCat = new this.userModel(createUserDto);
    return createdCat.save();
  }

  async getToken(username: string): Promise<string | null> {
    const user = await this.userModel.findOne({ name: username });
    if (!user) {
      return null;
    }
    return this.refreshTokenModel.findOne({ user: user.id });
  }

  async findOne(username: string): Promise<TypeOrNone<UserDocument>> {
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
