import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AuthFormData } from '../../dtos/auth-form-data.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}
  isLoading = false;
  hasError = false;

  async onSubmit(formData: AuthFormData) {
    try {
      this.isLoading = true;
      await this.authService
        .register(formData.email, formData.password)
        .toPromise();
    } catch (error) {
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
