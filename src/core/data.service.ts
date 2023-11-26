import { UserService } from './users.service';

export abstract class IDataService {
  abstract users: UserService;
}
