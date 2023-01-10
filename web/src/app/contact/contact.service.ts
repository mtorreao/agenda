import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ContactDto } from './dtos/contact.dto';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3000/api';

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
      .pipe(tap((contacts: ContactDto[]) => contacts));
  }

  deleteContact(id: string) {
    return this.http.delete(
      `${this.baseUrl}/contacts/${id}`,
      this.getHttpOptions()
    );
  }

  createContact(contact: ContactDto) {
    return this.http.post(
      `${this.baseUrl}/contacts`,
      contact,
      this.getHttpOptions()
    );
  }

  updateContact(id: string, value: any) {
    return this.http.patch(
      `${this.baseUrl}/contacts/${id}`,
      value,
      this.getHttpOptions()
    );
  }
}
