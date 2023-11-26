// interface of DataService wich should be implemented
// by any service responsible for data fetching

import { IUsersService } from './users.service';

export abstract class IDataService {
  abstract users: IUsersService;
}
