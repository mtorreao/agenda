import { Injectable } from '@nestjs/common';
import { CreateContactDto } from '../../shared/dto/create-contact.dto';
import { UpdateContactDto } from '../../shared/dto/update-contact.dto';
import { Contact } from '../../shared/entities/contact.entity';

@Injectable()
export class ContactFactoryService {
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
