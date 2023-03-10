import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AuthFormData } from '../../dtos/auth-form-data.dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  constructor(private authService: AuthService) {}
  isLoading = false;
  hasError = false;

  async onSubmit(formData: AuthFormData) {
    try {
      this.isLoading = true;
      await this.authService
        .login(formData.email, formData.password)
        .toPromise();
    } catch (error) {
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
