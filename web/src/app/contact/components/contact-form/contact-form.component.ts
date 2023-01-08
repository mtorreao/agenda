import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../../contact.service';
import { ContactDto } from '../../dtos/contact.dto';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ContactFormComponent>,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) private contact?: ContactDto
  ) {}

  isLoading = false;
  type: 'create' | 'update' = this.contact ? 'update' : 'create';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/
      ),
    ]),
  });

  ngOnInit(): void {
    if (this.contact) {
      this.form.patchValue(this.contact);
    }
  }

  async submit() {
    console.log('submit');
    if (this.form.invalid) {
      return;
    }
    try {
      this.isLoading = true;
      if (this.type === 'create') {
        await this.contactService.createContact(this.form.value).toPromise();
      } else {
        await this.contactService
          .updateContact(this.contact.id, this.form.value)
          .toPromise();
      }
      this.dialogRef.close(true);
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
