import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { ContactDto } from './dtos/contact.dto';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do getContacts', () => {
    const expected: ContactDto[] = [
      {
        id: '1',
        name: 'a',
        email: 'a@a.com',
        phone: '123',
      },
      {
        id: '2',
        name: 'b',
        email: 'b@b.com',
        phone: '456',
      },
    ];

    service.getContacts().subscribe((res) => {
      expect(res).toEqual(expected);
    });

    httpMock.expectOne(`http://localhost:9000/api/contacts`).flush(expected);
  });

  it('should delete contact', () => {
    const id = '1';

    service.deleteContact(id).subscribe(() => {
      expect(true).toBeTruthy();
    });

    httpMock.expectOne(`http://localhost:9000/api/contacts/${id}`).flush({});
  });

  it('should create a contact', () => {
    const contact: ContactDto = {
      id: '1',
      name: 'a',
      email: 'a@a.com',
      phone: '123',
    };

    service.createContact(contact).subscribe(() => {
      expect(true).toBeTruthy();
    });

    httpMock.expectOne(`http://localhost:9000/api/contacts`).flush({});
  });

  it('should update a contact', () => {
    const contact: ContactDto = {
      id: '1',
      name: 'a',
      email: 'a@a.com',
      phone: '123',
    };

    service.updateContact(contact.id, contact).subscribe(() => {
      expect(true).toBeTruthy();
    });

    httpMock.expectOne(`http://localhost:9000/api/contacts/${contact.id}`).flush(contact);
  });

});
