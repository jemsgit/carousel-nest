// create common service with other sevices injected to use it
// like dataService.users.findAll... in controllers
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataService } from '../../../core';
import { IUsersService } from '../../../core/users.service';
import { UsersService } from './users.service';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class MongoDataServices implements IDataService, OnApplicationBootstrap {
  users: IUsersService;
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  onApplicationBootstrap() {
    // use onApplicationBootstrap because we need to pass current implementation of
    // usersService wich cant be done with inject
    this.users = new UsersService(this.userModel, this.refreshTokenModel);
  }
}
