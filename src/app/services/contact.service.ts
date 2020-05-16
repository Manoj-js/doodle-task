import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactChanged = new Subject<Contact[]>();
  private contacts: Contact[] = [
    {
      fullname : 'manoj',
      email : 'manoj@doodleblue.com',
      address: 'k.k nagar',
      company: 'DoodleBlue Inovations',
      phone: 7299545375,
      isSelected: false

    },
    {
      fullname : 'aravind',
      email : 'aravind@doodleblue.com',
      address: 'k.k nagar',
      company: 'DoodleBlue Inovations',
      phone: 7299545375,
      isSelected: false

    },
    {
      fullname : 'akash',
      email : 'akash@doodleblue.com',
      address: 'k.k nagar',
      company: 'DoodleBlue Inovations',
      phone: 7299545375,
      isSelected: false

    },
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
    this.contacts.unshift(contact);
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
