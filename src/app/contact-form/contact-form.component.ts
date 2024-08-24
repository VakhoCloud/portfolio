import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { ContactFormService } from './contact-form.service';


@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
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
  
  onSubmit(form: any) {
    console.log('Form submitted:', form.value);
  }
}
