import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactDto } from '../../dtos/contact.dto';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
})
export class ListContactsComponent {
  @Input() contacts: ContactDto[] = [];
  @Output() onEditEM = new EventEmitter<ContactDto>();
  @Output() onDeleteEM = new EventEmitter<ContactDto>();

  onEdit(contact: ContactDto) {
    this.onEditEM.emit(contact);
  }

  onDelete(contact: ContactDto) {
    this.onDeleteEM.emit(contact);
  }
}
