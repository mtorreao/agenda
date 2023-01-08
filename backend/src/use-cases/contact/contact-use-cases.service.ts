import { Injectable } from '@nestjs/common';
import { IDatabase } from '../../shared/abstracts/database.abstract';
import { CreateContactDto } from '../../shared/dto/create-contact.dto';
import { FindAllDto } from '../../shared/dto/find-all.dto';
import { UpdateContactDto } from '../../shared/dto/update-contact.dto';
import { ContactFactoryService } from './contact-factory.service';

@Injectable()
export class ContactUseCasesService {
  constructor(
    private readonly contactFactory: ContactFactoryService,
    private readonly repository: IDatabase,
  ) {}

  create(createContactDto: CreateContactDto, userId: string) {
    return this.repository.contacts.create(
      this.contactFactory.createNewContact(createContactDto, userId),
    );
  }

  async findAll(dto: FindAllDto) {
    return (await this.repository.contacts.findAll(dto.userId)).map((c) =>
      this.contactFactory.mapContact(c),
    );
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
