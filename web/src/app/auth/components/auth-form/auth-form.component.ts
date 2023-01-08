import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthFormData } from '../../dtos/auth-form-data.dto';

type AuthFormType = 'login' | 'register';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
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
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/
      ),
    ]),
  });

  ngOnInit(): void {
    if (this.type === 'register') {
      this.form.addControl('passwordConfirmation', new FormControl(''));
    }
  }

  submit() {
    this.confirmPassword();
    if (this.form.valid) {
      this.submitEM.emit(this.form.value as AuthFormData);
    }
  }

  confirmPassword() {
    if (this.form.value.password !== this.form.value.passwordConfirmation) {
      this.form.controls.passwordConfirmation.setErrors({
        passwordConfirmation: true,
      });
    } else {
      this.form.controls.passwordConfirmation.setErrors(null);
    }
  }
}
