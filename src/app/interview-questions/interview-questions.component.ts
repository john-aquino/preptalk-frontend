import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { InterviewService } from '../interview.service';

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface InterviewQuestionsResponse {
  questions: QuestionAnswer[];
}

@Component({
  selector: 'app-interview-questions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './interview-questions.component.html',
  styleUrls: ['./interview-questions.component.scss']
})
export class InterviewQuestionsComponent implements OnInit, OnDestroy {
  prompt: string = '';
  questions: QuestionAnswer[] = [];
  answersVisible: boolean = false;
  isLoading: boolean = true;
  error: string = '';
  loadingMessage: string = '';

  // An array of messages to display while loading.
  private loadingMessages: string[] = [
    "Forming the best interview...",
    "Gathering insights...",
    "Crafting challenging questions...",
    "Analyzing industry trends..."
  ];
  private loadingMessageIndex: number = 0;
  private loadingIntervalSub!: Subscription;

  constructor(
    private router: Router,
    private interviewService: InterviewService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Subscribe to the prompt from the service.
    this.interviewService.prompt$.subscribe((p) => {
      this.prompt = p;
      if (!this.prompt) {
        // If no prompt exists, send the user back to the prompt page.
        this.router.navigate(['/prompt']);
      } else {
        // Generate questions based on the prompt.
        this.generateQuestions();
      }
    });
  }

  generateQuestions(): void {
    this.isLoading = true;
    this.error = '';

    // Start rotating loading messages every 3 seconds.
    this.loadingMessageIndex = 0;
    this.loadingMessage = this.loadingMessages[this.loadingMessageIndex];
    this.loadingIntervalSub = interval(3000).subscribe(() => {
      this.loadingMessageIndex = (this.loadingMessageIndex + 1) % this.loadingMessages.length;
      this.loadingMessage = this.loadingMessages[this.loadingMessageIndex];
    });

    this.http.post<InterviewQuestionsResponse>(
      'https://ezyglmwvbh.execute-api.us-east-1.amazonaws.com/preptalk',
      { prompt: this.prompt }
    ).subscribe({
      next: (data) => {
        if (data.questions && data.questions.length > 0) {
          this.questions = data.questions;
          // Optionally, you can store the questions as a string in the InterviewService:
          this.interviewService.setQuestions(JSON.stringify(data.questions));
        } else {
          this.error = 'No questions were generated. Please try again.';
        }
        this.isLoading = false;
        if (this.loadingIntervalSub) {
          this.loadingIntervalSub.unsubscribe();
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error generating questions, please try again later.';
        this.isLoading = false;
        if (this.loadingIntervalSub) {
          this.loadingIntervalSub.unsubscribe();
        }
      }
    });
  }

  toggleAnswers(): void {
    this.answersVisible = !this.answersVisible;
  }

  retry(): void {
    this.generateQuestions();
  }

  ngOnDestroy(): void {
    if (this.loadingIntervalSub) {
      this.loadingIntervalSub.unsubscribe();
    }
  }
}