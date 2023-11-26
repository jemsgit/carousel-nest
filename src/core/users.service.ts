import { CreateUserDto } from './dto/create-user.dto';

export interface UsersService {
  createUser: (user: CreateUserDto) => void;
  findOne: (username: string) => void;
  updateRefresh: (username: string, token: string) => void;
}
