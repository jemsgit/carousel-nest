// interface for UsersService wich should be implemented
// by every seervice responsible for wokring with users data

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { TypeOrNone } from '../types/shared';

export interface IUsersService {
  createUser: (user: CreateUserDto) => Promise<User>;
  findOne: (username: string) => Promise<TypeOrNone<User>>;
  updateRefresh: (username: string, token: string) => void;
}
