import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLogged: boolean;
  private subs: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    const s = this.authService.isLogged$
      .pipe(
        map((isLogged) => {
          this.isLogged = isLogged;
        })
      )
      .subscribe();
    this.authService.checkToken();
    this.subs.push(s);
  }

  signOut() {
    this.authService.signOut();
    this.isLogged = false;
  }
}
