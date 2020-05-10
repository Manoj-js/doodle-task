import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactChanged = new Subject<Contact[]>();
  private contacts: Contact[] = [
    new Contact(
      'manoj',
      'manoj@doodleblue.com',
      7299545375,
      'Doodleblue Inovations',
      'k.k nagar'
    ),
    new Contact(
      'aravind',
      'aravind@doodleblue.com',
      7299545375,
      'Doodleblue Inovations',
      'k.k nagar'
    ),
    new Contact(
      'akash',
      'akash@doodleblue.com',
      7299545375,
      'Doodleblue Inovations',
      'k.k nagar'
    ),
  ];

  constructor() {}

  getContacts() {
    return [...this.contacts];
  }
  getContact(id: number) {
    return this.contacts[id];
  }

  getupdatedContacts() {
    return this.contactChanged.asObservable();
  }

  addContact(contact: Contact) {
    this.contacts.push(contact);
    this.contactChanged.next(this.contacts.slice());
  }

  updateContact(index: number, contact: Contact) {
    this.contacts[index] = contact;
    this.contactChanged.next(this.contacts.slice());
  }
  deleteContact(index: number) {
    this.contacts.splice(index);
    this.contactChanged.next(this.contacts.slice());
  }
}
