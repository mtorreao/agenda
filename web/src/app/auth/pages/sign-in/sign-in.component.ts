import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  obxs: Subscription[] = [];

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.router.navigate(['/contacts']);
    }
  }

  onSubmit() {
    try {
      this.isLoading = true;
      this.authService
        .login(this.form.value.email, this.form.value.password)
        .toPromise()
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }
}
