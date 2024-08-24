import { Component, OnInit } from '@angular/core';
import { ContactFormService } from '../../contact-form/contact-form.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit {
  showContactMenu: boolean = false;

  constructor(private contactFormService: ContactFormService){}

  ngOnInit(): void {
    this.contactFormService.showContactMenuSubject.subscribe((val: boolean) => {
      this.showContactMenu = val;
      console.log("Contact menu visibility changed:", val);
    });
  }

   toggleContactForm() {
    this.contactFormService.toggleContactForm();
  }

}
