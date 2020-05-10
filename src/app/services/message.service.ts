import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageUpdated = new Subject<Message[]>();
  private messages: Message[] = [
    new Message('akash', 'manoj', 'hi bro'),
    new Message('manoj', 'akash', 'hi bro'),
  ];
  constructor() {}

  getMessageUpdated() {
    return this.messageUpdated.asObservable();
  }

  getAllMessages() {
    return [...this.messages];
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageUpdated.next(this.messages.slice());
  }
}
