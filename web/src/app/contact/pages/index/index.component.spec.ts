import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, of } from 'rxjs';
import { ContactService } from '../../contact.service';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;
  const contactServiceSpy = jasmine.createSpyObj('ContactService', ['getContacts', 'deleteContact']);
  const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const contact = {
    id: '1',
    name: 'John Doe',
    email: 'a@a.com',
    phone: '1234567890',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexComponent ],
      providers: [
        { provide: ContactService, useValue: contactServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete a contact', () => {
    contactServiceSpy.deleteContact.and.returnValue(Promise.resolve());
    
    component.onDelete(contact);
    expect(contactServiceSpy.deleteContact).toHaveBeenCalledWith(contact.id);
  });

  it('should open edit dialog', () => {
    const afterClosed$ = new BehaviorSubject(false);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', {
      afterClosed: afterClosed$,
    });
    dialogSpy.open.and.returnValue(dialogRefSpy);
    afterClosed$.next(true);
    component.onEdit(contact);
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
  });
});
