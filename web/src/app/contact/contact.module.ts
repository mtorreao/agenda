import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAngularModule } from '../material-angular.module';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
  declarations: [IndexComponent, ListContactsComponent, ContactFormComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialAngularModule,
  ],
})
export class ContactModule {}
