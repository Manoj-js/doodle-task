import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts-data/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts-data/contact-detail/contact-detail.component';
import { ContactCreateComponent } from './contacts-data/contact-create/contact-create.component';
import { NavComponent } from './nav-header/nav.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ContactsComponent } from './contacts-data/contacts/contacts.component';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ContactHeaderComponent } from './contacts-data/contact-header/contact-header.component';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactCreateComponent,
    NavComponent,
    ContactsComponent,
    ContactHeaderComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FilterPipeModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [BsModalRef],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
