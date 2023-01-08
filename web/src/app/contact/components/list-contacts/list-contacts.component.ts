import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContactService } from '../../contact.service';
import { ContactDto } from '../../dtos/contact.dto';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css'],
})
export class ListContactsComponent implements OnInit, OnDestroy {
  contacts$ = new BehaviorSubject<ContactDto[]>([]);
  private subs: Subscription[] = [];

  constructor(private contactService: ContactService) {}

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    const s = this.contactService.getContacts().subscribe((contacts: ContactDto[]) => {
      console.log(contacts);
      this.contacts$.next(contacts);
    });
    this.subs.push(s);
  }

  onEdit() {}
}
