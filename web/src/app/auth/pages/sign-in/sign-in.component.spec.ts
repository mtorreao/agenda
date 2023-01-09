import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../auth.service';

import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', {
    login: Promise.resolve(),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
      declarations: [ SignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should call authService.login when submit', () => {
    const expectedEmail = 'a@a.com';
    const expectedPassword = 'Asdf1234#';
    component.onSubmit({ email: expectedEmail, password: expectedPassword });
    expect(authServiceSpy.login).toHaveBeenCalledWith(expectedEmail, expectedPassword);
  });

  it ('should set hasError if the login has an error', () => {
    authServiceSpy.login.and.returnValue(Promise.reject());
    const expectedEmail = 'a@a.com';
    const expectedPassword = 'Asdf1234#';
    component.onSubmit({ email: expectedEmail, password: expectedPassword });
    expect(component.hasError).toBeTrue();
  });
});
