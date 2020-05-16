import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactService } from '../services/contact.service';
import { Message } from '../models/message';
import { MessageService } from '../services/message.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  @ViewChild('model') public Model: ModalDirective;
  contacts: Contact[] = [];
  loadedmessages: Message[] = [];
  messages: Message[];
  constactSubs: Subscription;
  messageSub: Subscription;
  currentuser: string;
  intervelSub: Subscription;
  constructor(
    private contactService: ContactService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.constactSubs = this.contactService
      .getupdatedContacts()
      .subscribe((contacts) => {
        this.contacts = contacts;
      });
    this.loadedmessages = this.messageService.getAllMessages();
    this.messageSub = this.messageService
      .getMessageUpdated()
      .subscribe((messages) => {
        this.loadedmessages = messages;
      });
    this.currentuser = this.contacts[0].fullname;

    this.intervelSub = interval(300).subscribe(() => {
      this.onUserChange(this.currentuser);
    });
  }

  onUserChange(username: string) {
    this.messages = this.loadedmessages.filter((msg) => msg.to === username);
    this.currentuser = username;
  }

  ngOnDestroy() {
    this.constactSubs.unsubscribe();
    this.messageSub.unsubscribe();
    this.intervelSub.unsubscribe();
  }
}
