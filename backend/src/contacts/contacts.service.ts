import { Injectable } from '@nestjs/common';
import { IDatabase } from '../shared/abstracts/database.abstract';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly repository: IDatabase) {}

  create(createContactDto: CreateContactDto) {
    return this.repository.contacts.create(createContactDto);
  }

  findAll() {
    return this.repository.contacts.findAll();
  }

  findOne(id: string) {
    return this.repository.contacts.findById(id);
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.repository.contacts.update(id, updateContactDto);
  }

  remove(id: string) {
    return this.repository.contacts.delete(id);
  }
}
