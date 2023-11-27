// interface for UsersService wich should be implemented
// by every seervice responsible for wokring with users data

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { TypeOrNone } from '../types/shared';

export abstract class IUsersService {
  abstract createUser: (user: CreateUserDto) => Promise<User>;
  abstract findOne: (username: string) => Promise<TypeOrNone<User>>;
  abstract updateRefresh: (username: string, token: string) => void;
  abstract getToken: (userId: string) => Promise<string | null>;
}
