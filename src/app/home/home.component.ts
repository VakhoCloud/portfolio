import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';

import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactFormService } from '../contact-form/contact-form.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, HeroComponent, ProjectsSectionComponent, FooterComponent, SkillsComponent, MatSidenavModule, FormsModule, MatIconModule, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  isChecked = false;
  scrollPosition = 0;
  showContactMenu: boolean = false;

  @ViewChild('hero') heroSection!: ElementRef;
  @ViewChild('skills') skillsSection!: ElementRef;
  @ViewChild('projects') projectsSection!: ElementRef;
  @ViewChild('footer') footerSection!: ElementRef;
  @ViewChild('content', { static: false }) contentDiv!: ElementRef;

  constructor(private renderer: Renderer2, private contactFormService: ContactFormService) {}

  ngOnInit(): void {
    this.contactFormService.showContactMenuSubject.subscribe((val: boolean) => {
      this.showContactMenu = val;
      console.log("Contact menu visibility changed:", val);
    });
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }



  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const sectionId = entry.target.id;
        const navItem = document.querySelector(`a[href="#${sectionId}"]`);

        if (entry.isIntersecting) {
          this.renderer.addClass(navItem, 'active');
        } else {
          this.renderer.removeClass(navItem, 'active');
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    if (this.heroSection && this.heroSection.nativeElement) {
      observer.observe(this.heroSection.nativeElement);
    }
    if (this.skillsSection && this.skillsSection.nativeElement) {
      observer.observe(this.skillsSection.nativeElement);
    }
    if (this.projectsSection && this.projectsSection.nativeElement) {
      observer.observe(this.projectsSection.nativeElement);
    }
    if (this.footerSection && this.footerSection.nativeElement) {
      observer.observe(this.footerSection.nativeElement);
    }
  }

  scrollToSection(sectionId: string) {
   
    const element = document.getElementById(sectionId);
  
    if (element) {
      // Remove the .pushed class from .content (if it exists)
      if (this.contentDiv && this.contentDiv.nativeElement) {
        const contentElement = this.contentDiv.nativeElement; 
        if (contentElement.classList.contains('pushed')) {
          this.renderer.removeClass(contentElement, 'pushed');
        }
      }
      
      // Close the menu
      this.isChecked = false;

      setTimeout(() => {;

        const logoBox = document.querySelector('.logo-box');
        const logoBoxHeight = logoBox ? logoBox.clientHeight + 10 : 0;


    
        // Calculate the element's position relative to the viewport
        const elementPosition = element.getBoundingClientRect().top;
    
        // Get the current scroll position
        const offsetPosition = elementPosition + window.scrollY;
    
        // Adjust for the height of .logo-box
        const adjustedPosition = offsetPosition - logoBoxHeight;
    
        // Scroll to the adjusted position
        window.scrollTo({ top: adjustedPosition, behavior: 'smooth' });
    
      }, 300); // Adjust timeout as needed to match animation duration
    }
  }

  getIndexById(id: string): number {
    const sections = ['hero', 'skills', 'projects', 'footer'];
    return sections.indexOf(id) + 1; // nth-child index is 1-based
  }

 
} 

