import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatIcon]
})
export class HeaderComponent {
  isChecked = false;
  scrollPosition = 0;

  @ViewChild('hero') heroSection!: ElementRef;
  @ViewChild('skills') skillsSection!: ElementRef;
  @ViewChild('projects') projectsSection!: ElementRef;
  @ViewChild('footer') footerSection!: ElementRef;
  @ViewChild('content', { static: false }) contentDiv!: ElementRef;

  constructor(private renderer: Renderer2) {}

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
  
      // Get the height of the .logo-box element
      const logoBox = document.querySelector('.logo-box');
      const logoBoxHeight = logoBox ? logoBox.clientHeight : 0;
  
      // Calculate the element's position relative to the viewport
      const elementPosition = element.getBoundingClientRect().top;
  
      // Get the current scroll position
      const offsetPosition = elementPosition + window.scrollY;
  
      // Adjust for the height of .logo-box
      const adjustedPosition = offsetPosition - logoBoxHeight;
  
      // Scroll to the adjusted position
      window.scrollTo({ top: adjustedPosition, behavior: 'smooth' });
  
      // Close the menu
      this.isChecked = false;
    }
  }
  

  getIndexById(id: string): number {
    const sections = ['hero', 'skills', 'projects', 'footer'];
    return sections.indexOf(id) + 1; // nth-child index is 1-based
  }
}