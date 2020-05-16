import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-header',
  templateUrl: './contact-header.component.html',
  styleUrls: ['./contact-header.component.css']
})
export class ContactHeaderComponent implements OnInit {

  constructor( private router: Router,
               private route: ActivatedRoute, ) { }

  ngOnInit(): void {
  }
  addContact() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
