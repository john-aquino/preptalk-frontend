import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-interview-prompt',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './interview-prompt.component.html',
  styleUrls: ['./interview-prompt.component.scss']
})
export class InterviewPromptComponent {
  prompt: string = '';

  constructor(private router: Router, private interviewService: InterviewService) {}

  submitPrompt(): void {
    if (!this.prompt.trim()) {
      // Optionally, display a validation message if empty
      alert('Please enter some interview details.');
      return;
    }
    // Save the prompt and navigate to the questions page.
    this.interviewService.setPrompt(this.prompt);
    this.router.navigate(['/questions']);
  }
}