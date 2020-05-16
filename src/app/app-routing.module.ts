import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailComponent } from './contacts-data/contact-detail/contact-detail.component';
import { ContactCreateComponent } from './contacts-data/contact-create/contact-create.component';
import { ContactsComponent } from './contacts-data/contacts/contacts.component';


const routes: Routes = [
  { path: '', redirectTo: '/contact', pathMatch: 'full' },
  {
    path: 'contact',
    component: ContactsComponent,
    children: [
      { path: '', component: ContactCreateComponent },
      { path: 'new', component: ContactCreateComponent },
      { path: ':id', component: ContactDetailComponent },
      { path: ':id/edit', component: ContactCreateComponent },
      { path: '**', component: ContactCreateComponent }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
