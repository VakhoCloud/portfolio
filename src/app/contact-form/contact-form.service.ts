import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  showContactMenu: boolean = false;
  showContactMenuSubject = new Subject<boolean>();

  
  toggleContactForm() {
    this.showContactMenu = !this.showContactMenu;
    this.showContactMenuSubject.next(this.showContactMenu);
  }
  
  getContactMenuState() {
    return this.showContactMenu;
  }
  
 
}
