import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  showContactMenu: boolean = false;
  showContactMenuSubject = new Subject<boolean>();

  
  register(nameL: string, email: string, phoneNumber: string, mailsubject: string, message: string) { 
   
  }
  
  toggleContactForm() {
    this.showContactMenu = !this.showContactMenu;
    this.showContactMenuSubject.next(this.showContactMenu);
  }

  getContactMenuState() {
    return this.showContactMenu;
  }


}
