import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ContactService } from '../../contact.service';
import { ContactDto } from '../../dtos/contact.dto';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  contacts$ = new BehaviorSubject<ContactDto[]>([]);

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  openContactFormDialog(data?: ContactDto) {
    const dialogRef = this.dialog.open(ContactFormComponent, {
      data,
      minWidth: '300px',
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (needUpdate) => {
      console.log('The dialog was closed');
      if (needUpdate) {
        this.loadContacts();
      }
    });
  }

  onEdit(contact: ContactDto) {
    this.openContactFormDialog(contact);
  }

  async onDelete(contact: ContactDto) {
    await this.contactService.deleteContact(contact.id).toPromise();
    this.loadContacts();
  }

  private async loadContacts() {
    console.log('loadContacts');
    this.contacts$.next(await this.contactService.getContacts().toPromise());
  }
}
