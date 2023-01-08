import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFormData } from '../../dtos/auth-form-data.dto';

type AuthFormType = 'login' | 'register';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  @Input() type: AuthFormType;
  @Input() title: string;
  @Input() hasError = false;
  @Input() isLoading = false;
  @Output() submitEM: EventEmitter<AuthFormData> = new EventEmitter();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value as AuthFormData);
    }
  }
}
