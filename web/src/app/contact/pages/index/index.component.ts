import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private contactService: ContactService,
    private snackBar: MatSnackBar
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
      if (needUpdate) {
        this.loadContacts();
        this.showSnackBar('Contato salvo');
      }
    });
  }

  onEdit(contact: ContactDto) {
    this.openContactFormDialog(contact);
  }

  async onDelete(contact: ContactDto) {
    try {
      await this.contactService.deleteContact(contact.id).toPromise();
      this.showSnackBar('Contato excluído');
      this.loadContacts();
    } catch (error) {
      this.showSnackBar('Ocorreu um erro ao tentar excluir um contato');
    }
  }

  private async loadContacts() {
    this.contacts$.next(await this.contactService.getContacts().toPromise());
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }
}
