// src/app/interview/interview.component.ts
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interview',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Add these modules
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent {
  prompt: string = '';
  response: string = '';

  constructor(private http: HttpClient) { }

  getInterviewQuestions(): void {
    this.http.post<{ response: string }>('http://localhost:8080/generate', { prompt: this.prompt })
      .subscribe({
        next: data => this.response = data.response,
        error: err => {
          console.error(err);
          this.response = 'Error generating questions, please try again later.';
        }
      });
  }
}