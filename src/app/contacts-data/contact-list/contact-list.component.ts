import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact';
import { FilterPipe } from 'ngx-filter-pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Message } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  userFilter: any = { fullname: '' };
  messageForm: FormGroup;
  selectedUserName: string;
  contactSubscription: Subscription;
  @ViewChild('model') public Model: ModalDirective;
  constructor(
    private contactService: ContactService,
    private filterPipe: FilterPipe,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.Form();
    this.contacts = this.contactService.getContacts();
    this.contactSubscription = this.contactService
      .getupdatedContacts()
      .subscribe((contacts) => {
        this.contacts = contacts;
      });
  }

  private Form() {
    this.messageForm = new FormGroup({
      to: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  onclick(selectedUserName: string) {
    this.selectedUserName = selectedUserName;
  }

  onSendMessage(tocontact, tomessage) {
    const message: Message = {
      from: this.selectedUserName,
      to: tocontact.value,
      message: tomessage.value,
    };
    this.messageService.addMessage(message);
    this.Model.hide();
  }

  addContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }
}
