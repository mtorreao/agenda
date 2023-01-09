import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ObservableInput } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginResponse } from './dtos/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:9000/api';
  public isLogged$ = new BehaviorSubject<boolean>(false);
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {}

  checkToken(): void {
    const accessToken = localStorage.getItem('accessToken');
    this.isLogged$.next(!!accessToken);
  }

  login(email: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res: LoginResponse) => this.handleSuccess(res)),
        catchError((err, caught) => this.handleError(err, caught))
      );
  }

  register(email: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/auth/register`, {
        email,
        password,
      })
      .pipe(
        tap((res: LoginResponse) => this.handleSuccess(res)),
        catchError((err, caught) => this.handleError(err, caught))
      );
  }

  signOut() {
    localStorage.removeItem('accessToken');
    this.isLogged$.next(false);
    this.redirectUrl = null;
    this.router.navigate(['/auth/sign-in']);
  }

  handleSuccess(res: LoginResponse) {
    localStorage.setItem('accessToken', res.accessToken);
    this.isLogged$.next(true);
    this.router.navigate([this.redirectUrl || '/contacts']);
  }

  handleError(err, caught: Observable<LoginResponse>): ObservableInput<any> {
    this.isLogged$.next(false);
    throw err;
  }
}
