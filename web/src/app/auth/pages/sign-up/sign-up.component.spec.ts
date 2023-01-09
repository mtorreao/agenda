import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', {
    register: Promise.resolve(),
  });
  const snackSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },

        {
          provide: MatSnackBar,
          useValue: snackSpy,
        },
      ],
      declarations: [SignUpComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when submit', () => {
    const expectedEmail = 'a@a.com';
    const expectedPassword = 'Asdf1234#';
    component.onSubmit({ email: expectedEmail, password: expectedPassword });
    expect(authServiceSpy.register).toHaveBeenCalledWith(
      expectedEmail,
      expectedPassword
    );
  });

  it('should set hasError if the login has an error', () => {
    authServiceSpy.register.and.returnValue(Promise.reject());
    const expectedEmail = 'a@a.com';
    const expectedPassword = 'Asdf1234#';
    component.onSubmit({ email: expectedEmail, password: expectedPassword });
    expect(component.hasError).toBeTrue();
  });
});
