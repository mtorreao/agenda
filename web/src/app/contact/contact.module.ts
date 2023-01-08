import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAngularModule } from '../material-angular.module';
import { IndexComponent } from './pages/index/index.component';
import { ListContactsComponent } from './components/list-contacts/list-contacts.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
  declarations: [IndexComponent, ListContactsComponent, ContactFormComponent],
  exports: [],
  imports: [CommonModule, MaterialAngularModule],
})
export class ContactModule {}