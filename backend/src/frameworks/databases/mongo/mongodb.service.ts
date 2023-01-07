import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDatabase } from '../../../shared/abstracts/database.abstract';
import { IGenericRepository } from '../../../shared/abstracts/generic-repository.abstract';
import { Contact } from '../../../shared/entities/contact.entity';
import { User } from '../../../shared/entities/user.entity';
import { MongoGenericRepository } from './mongodb-generic-repository';

@Injectable()
export class MongoDBService implements IDatabase, OnApplicationBootstrap {
  contacts: MongoGenericRepository<Contact>;
  users: IGenericRepository<User>;

  constructor(
    @InjectModel(Contact.name)
    private ContactRepository: Model<Contact>,
    @InjectModel(User.name)
    private UserRepository: Model<User>,
  ) {}

  onApplicationBootstrap() {
    this.contacts = new MongoGenericRepository<Contact>(this.ContactRepository);
    this.users = new MongoGenericRepository<User>(this.UserRepository);
  }
}
