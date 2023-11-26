// create common service with other sevices injected to use it
// like dataService.users.findAll... in controllers

import { Injectable } from '@nestjs/common';
import { IDataService } from '../../../core';
import { IUsersService } from '../../../core/users.service';
import { UsersService } from './users.service';

@Injectable()
export class MongoDataServices implements IDataService {
  users: IUsersService;
  constructor(users: UsersService) {}
}
