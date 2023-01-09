import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../contact.service';

import { ContactFormComponent } from './contact-form.component';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  // private dialogRef: MatDialogRef<ContactFormComponent>,
  //   private contactService: ContactService,
  //   private snack: MatSnackBar,
  //   @Inject(MAT_DIALOG_DATA) private contact?: ContactDto
  const contactServiceSpy = jasmine.createSpyObj('ContactService', ['createContact', 'updateContact']);
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
  const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const contact = {
    id: '1',
    name: 'John Doe',
    email: 'a@a.com',
    phone: '1234567890',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MatSnackBar, useValue: snackSpy },
        { provide: MAT_DIALOG_DATA, useValue: contact },
      ],
      declarations: [ ContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return if form is invalid', () => {
    component.form.controls.name.setValue('');
    component.submit();
    expect(component.form.invalid).toBeTrue();
  });

  it('should create a contact if form is valid', () => {
    component.form.controls.name.setValue('John Doe');
    component.form.controls.email.setValue('a@a.com');
    component.form.controls.phone.setValue('1234567890');
    component.type = 'create';
    component.submit();
    expect(contactServiceSpy.createContact).toHaveBeenCalledWith({...component.form.value});
  });

  it('should update a contact if form is valid', () => {
    contactServiceSpy.updateContact.and.returnValue(Promise.resolve());
    component.form.controls.name.setValue(contact.name);
    component.form.controls.email.setValue(contact.email);
    component.form.controls.phone.setValue(contact.phone);
    component.type = 'update';
    component.submit();
    expect(contactServiceSpy.updateContact).toHaveBeenCalledWith('1', {...component.form.value});
  });
});
