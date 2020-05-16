import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageUpdated = new Subject<Message[]>();
  private messages: Message[] = [
    {
      from: 'akash',
      to: 'manoj',
      message: 'hi bro',
    },
    {
      from: 'manoj',
      to: 'akash',
      message: 'hi bro',
    },
  ];
  constructor() {}

  getMessageUpdated() {
    return this.messageUpdated.asObservable();
  }

  getAllMessages() {
    return [...this.messages];
  }

  addMessage(message: Message) {
    this.messages.unshift(message);
    this.messageUpdated.next(this.messages.slice());
  }
}
