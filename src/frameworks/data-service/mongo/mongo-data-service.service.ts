import { Injectable } from '@nestjs/common';
import { IDataService } from '../../../core';
import { UsersService as IUserService } from '../../../core/users.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MongoDataServices implements IDataService {
  users: IUserService;
  constructor(users: UsersService) {}
}
