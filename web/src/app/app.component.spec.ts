import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', {
    isLogged$: {
      pipe: () => of(true),
    },
    checkToken: null,
    signOut: Promise.resolve(),
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    component = TestBed.createComponent(AppComponent).componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should sign out', () => {
    component.signOut();
    expect(authServiceSpy.signOut).toHaveBeenCalled();
  });
});
