import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css'],
})
export class ContactCreateComponent implements OnInit, OnDestroy {
  detailForm: FormGroup;
  contact: Contact;
  id: number;
  editMode = false;
  routeSub: Subscription;
  submitted = false;
  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }
  get f() {
    return this.detailForm.controls;
  }
  private initForm() {
    let fullname = '';
    let email = '';
    let phone;
    let company = '';
    let address = '';

    if (this.editMode) {
      const contact: Contact = this.contactService.getContact(this.id);
      fullname = contact.fullname;
      email = contact.email;
      phone = contact.phone;
      company = contact.company;
      address = contact.address;
    }

    this.detailForm = new FormGroup({
      fullname: new FormControl(fullname, Validators.required),
      email: new FormControl(email, [Validators.required, Validators.email]),
      phone: new FormControl(phone, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      company: new FormControl(company, Validators.required),
      address: new FormControl(address, Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.detailForm.valid) {
      return;
    }
    if (this.editMode) {
      this.contactService.updateContact(this.id, this.detailForm.value);
      this.toastr.info('Contact Updated');
      this.submitted = false;
      this.detailForm.reset();
    } else {
      this.contactService.addContact(this.detailForm.value);
      this.toastr.success('New Contact Added');
      this.submitted = false;
      this.detailForm.reset();
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.contactService.deleteContact(this.id);
    this.toastr.warning('Contact Deleted');
    this.router.navigate([''], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
