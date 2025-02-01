import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-interview-questions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.scss']
})
export class InterviewQuestionsComponent implements OnInit {
  prompt: string = '';
  questions: string = '';
  answersVisible: boolean = false;
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private router: Router,
    private interviewService: InterviewService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Subscribe to the prompt from the service
    this.interviewService.prompt$.subscribe((p) => {
      this.prompt = p;
      if (!this.prompt) {
        // If no prompt exists, send the user back to the prompt page.
        this.router.navigate(['/prompt']);
      } else {
        // Try to generate questions based on the prompt.
        this.generateQuestions();
      }
    });
  }

  generateQuestions(): void {
    this.isLoading = true;
    this.error = '';
    this.http.post<{ response: string }>('http://localhost:8080/generate', { prompt: this.prompt })
      .subscribe({
        next: (data) => {
          if (data.response && data.response.trim()) {
            this.questions = data.response;
            this.interviewService.setQuestions(this.questions);
          } else {
            this.error = 'No questions were generated. Please try again.';
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Error generating questions, please try again later.';
          this.isLoading = false;
        }
      });
  }

  toggleAnswers(): void {
    this.answersVisible = !this.answersVisible;
  }

  retry(): void {
    this.generateQuestions();
  }
}