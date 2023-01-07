import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDatabase } from '../../../shared/abstracts/database.abstract';
import { Contact } from '../../../shared/entities/contact.entity';
import { MongoGenericRepository } from './mongodb-generic-repository';

@Injectable()
export class MongoDBService implements IDatabase, OnApplicationBootstrap {
  contacts: MongoGenericRepository<Contact>;

  constructor(
    @InjectModel(Contact.name)
    private ContactRepository: Model<Contact>,
  ) {}

  onApplicationBootstrap() {
    this.contacts = new MongoGenericRepository<Contact>(this.ContactRepository);
  }
}
