import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should do login', () => {
    const accessToken = '123';

    service.login('', '').subscribe((res) => {
      expect(res.accessToken).toEqual(accessToken);
    });

    httpMock.expectOne(`${service.apiUrl}/auth/login`).flush({
      accessToken,
    });
  });

  it('should do register', () => {
    const expected = {
      user: {
        id: '1',
        email: 'a@a.com',
      },
      accessToken: '123',
    };

    service.register(expected.user.email, '').subscribe((res) => {
      expect(res).toEqual(expected);
    });

    httpMock.expectOne(`${service.apiUrl}/auth/register`).flush(expected);
  });

  it('should check token', () => {
    const accessToken = '321';
    localStorage.setItem('accessToken', accessToken);

    service.checkToken();

    service.isLogged$.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('should remove token on sign out', () => {
    const accessToken = '321';
    localStorage.setItem('accessToken', accessToken);

    service.signOut();

    expect(localStorage.getItem('accessToken')).toBeNull();
  });

  it('should isLogged to be falsy on sign out', () => {
    service.isLogged$.subscribe((value) => {
      expect(value).toBeFalsy();
    });
    service.signOut();
  });

  it('should redirect to /auth/sign-in on sign out', () => {
    service.signOut();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
  });

  it('should redirect to /contacts on sign in', () => {
    service.redirectUrl = '/contacts';
    service.handleSuccess({
      accessToken: '',
      user: { id: '1', email: 'a@a.com' },
    });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/contacts']);
  });

  it('should isLogged to be falsy on error', () => {
    service.isLogged$.subscribe((value) => {
      expect(value).toBeFalsy();
    });
    try {
      service.handleError({}, of());
    } catch (error) {}
  });
});
