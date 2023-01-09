import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const authServiceSpy = jasmine.createSpyObj('AuthService', {
    isLogged$: { value: true },
  });
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should check if user is logged', () => {
    authServiceSpy.isLogged$.value = true;
    expect(guard.checkLogin('/')).toBeTruthy();
  });

  it('should redirect to login if user is not logged', () => {
    authServiceSpy.isLogged$.value = false;
    expect(guard.checkLogin('/')).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
  });
});
