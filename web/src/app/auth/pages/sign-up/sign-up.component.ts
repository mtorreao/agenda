import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
import { AuthFormData } from '../../dtos/auth-form-data.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}
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
      this.snackBar.open(error.error.message, '', {
        duration: 5000,
      });
    } finally {
      this.isLoading = false;
    }
  }
}
