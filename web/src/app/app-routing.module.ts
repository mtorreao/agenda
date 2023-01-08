import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { IndexComponent as ContactIndex } from './contact/pages/index/index.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // Contacts
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactIndex,
      },
    ],
  },
  // Auth
  {
    path: 'auth',
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },

      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
