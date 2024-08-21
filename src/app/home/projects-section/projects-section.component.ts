import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('hidden', style({
        transform: 'scale(0.8)',
        opacity: 0,
      })),
      state('visible', style({
        transform: 'scale(1)',
        opacity: 1,
      })),
      transition('hidden => visible', animate('700ms ease-in')),
      transition('visible => hidden', animate('700ms ease-out')),
    ]),
  ],
})
export class ProjectsSectionComponent {
  demoEmail: string = "test@test.com";
  demoPassword: string = "test123";
  projectsVisible = false;


  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = document.querySelector('.projects-box')?.getBoundingClientRect().top;
    const scrollPosition = window.innerHeight;

    if (componentPosition && componentPosition < scrollPosition) {
      this.projectsVisible = true;
    } else {
      this.projectsVisible = false;
    }
  }
}
