import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ContactDto } from './dtos/contact.dto';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:9000/api';

  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const accessToken = localStorage.getItem('accessToken');
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
  getContacts() {
    return this.http
      .get(`${this.baseUrl}/contacts`, this.getHttpOptions())
      .pipe(tap((res: ContactDto[]) => res));
  }
}
