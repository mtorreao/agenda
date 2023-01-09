import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit should add a formControl for password verification if is type "register"', () => {
    component.type = 'register';
    component.ngOnInit();
    expect(component.form.controls.passwordConfirmation).toBeTruthy();
  });

  it('should set an error if password confirmation is not equal', () => {
    component.form.controls.password.setValue('12345678');
    component.form.addControl('passwordConfirmation', new FormControl(''));
    component.form.controls.passwordConfirmation.setValue('1');
    component.confirmPassword();
    expect(component.form.controls.passwordConfirmation?.errors).toBeTruthy();
  });

  it('should clear error if password confirmation is equal', () => {
    component.form.controls.password.setValue('12345678');
    component.form.addControl('passwordConfirmation', new FormControl(''));
    component.form.controls.passwordConfirmation.setValue('12345678');
    component.confirmPassword();
    expect(component.form.controls.passwordConfirmation?.errors).toBeFalsy();
  });

  it('should emit an event with the form value if the form is valid', () => {
    const expectedEmail = 'a@a.com';
    const expectedPassword = 'Asdf1234#';
    spyOn(component.submitEM, 'emit');
    component.form.controls.email.setValue(expectedEmail);
    component.form.controls.password.setValue(expectedPassword);
    component.submit();
    expect(component.submitEM.emit).toHaveBeenCalledWith({
      email: expectedEmail,
      password: expectedPassword,
    });
  });
});
