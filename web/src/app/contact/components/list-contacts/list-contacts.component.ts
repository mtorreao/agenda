import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContactService } from '../../contact.service';
import { ContactDto } from '../../dtos/contact.dto';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
})
export class ListContactsComponent implements OnInit {
  contacts$ = new BehaviorSubject<ContactDto[]>([]);
  @Output() onEditEM = new EventEmitter<ContactDto>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  onEdit(contact: ContactDto) {
    this.onEditEM.emit(contact);
  }

  async onDelete(contact: ContactDto) {
    await this.contactService.deleteContact(contact.id).toPromise();
    this.getContacts();
  }

  private async getContacts() {
    const contacts = await this.contactService.getContacts().toPromise();
    this.contacts$.next(contacts);
  }
}
