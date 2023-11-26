import { CreateUserDto } from './dto/create-user.dto';

export interface UserService {
  createUser: (user: CreateUserDto) => {};
  findOne: (username: string) => {};
  updateRefresh: (username: string, token: string) => {};
}
