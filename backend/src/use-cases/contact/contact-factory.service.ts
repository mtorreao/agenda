import { Injectable } from '@nestjs/common';
import { CreateContactDto } from '../../shared/dto/create-contact.dto';
import { UpdateContactDto } from '../../shared/dto/update-contact.dto';
import { Contact } from '../../shared/entities/contact.entity';
import { Contact as ContactModel } from '../../frameworks/databases/mongo/models/contact.model';

@Injectable()
export class ContactFactoryService {
  mapContact(data: ContactModel): Contact {
    const newContact = new Contact();
    newContact.id = data.id;
    newContact.name = data.name;
    newContact.email = data.email;
    newContact.phone = data.phone;
    return newContact;
  }

  createNewContact(dto: CreateContactDto, userId: string): Contact {
    const newContact = new Contact();
    newContact.name = dto.name;
    newContact.email = dto.email;
    newContact.phone = dto.phone;
    newContact.userId = userId;

    return newContact;
  }

  updateContact(dto: UpdateContactDto): Contact {
    const newContact = new Contact();
    newContact.name = dto.name;
    newContact.email = dto.email;
    newContact.phone = dto.phone;

    return newContact;
  }
}
