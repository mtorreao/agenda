import { Contact } from '../entities/contact.entity';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDatabase {
  abstract contacts: IGenericRepository<Contact>;
}
