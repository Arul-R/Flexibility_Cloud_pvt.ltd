import {
  Component,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  Renderer2
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Model for feedback (you can define it in another file if preferred)
class Feedback {
  constructor(
    public name: string,
    public email: string,
    public message: string,
    public rating: number
  ) {}
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomepageComponent implements AfterViewInit {
  feedback: Feedback = new Feedback('', '', '', 0);
  showPopup: boolean = false;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const navLinks = document.querySelectorAll('a[href^="#"]');
      navLinks.forEach(link => {
        this.renderer.listen(link, 'click', this.scrollToSection);
      });
    }
  }

  scrollToSection(event: Event) {
    event.preventDefault();
    const targetId = (event.target as HTMLAnchorElement).getAttribute('href')?.slice(1);
    const targetElement = document.getElementById(targetId || '');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }



  // This method handles the form submission
  submitFeedback(event: Event): void {
    event.preventDefault(); // Prevent form from submitting normally

    console.log('Feedback submitted:', this.feedback); // Check the console to see the form data

    this.showPopup = true; // Set showPopup to true, which will show the popup

    // Hide the popup after 3 seconds
    setTimeout(() => {
      this.showPopup = false;
    }, 10000);
  }

  scrollToContact(): void {
    if (this.isBrowser) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
