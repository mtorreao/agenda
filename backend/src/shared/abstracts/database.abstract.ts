import { Contact } from '../entities/contact.entity';
import { User } from '../entities/user.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDatabase {
  abstract contacts: IGenericRepository<Contact>;
  abstract users: IGenericRepository<User>;
}
