import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:9000/api';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((res: LoginResponse) => {
          localStorage.setItem('accessToken', res.accessToken);
          return res;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }
}
