// src/app/welcome/welcome.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'] // or .css if you're using CSS
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  // Navigate to the interview page
  goToInterview(): void {
    this.router.navigate(['/prompt']);
  }
}