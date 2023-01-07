import { Injectable } from '@nestjs/common';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import { CreateContactDto } from '../../shared/dto/create-contact.dto';
import { UpdateContactDto } from '../../shared/dto/update-contact.dto';
import { ContactFactoryService } from './contact.factory';

@Injectable()
export class ContactUseCasesService {
  constructor(
    private readonly repository: IDatabase,
    private readonly contactFactory: ContactFactoryService,
  ) {}

  create(createContactDto: CreateContactDto) {
    return this.repository.contacts.create(
      this.contactFactory.createNewContact(createContactDto),
    );
  }

  findAll() {
    return this.repository.contacts.findAll();
  }

  findOne(id: string) {
    return this.repository.contacts.findById(id);
  }

  update(id: string, updateContactDto: UpdateContactDto) {
    return this.repository.contacts.update(
      id,
      this.contactFactory.updateContact(updateContactDto),
    );
  }

  remove(id: string) {
    return this.repository.contacts.delete(id);
  }
}
