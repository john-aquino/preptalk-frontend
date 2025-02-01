// src/app/interview.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InterviewService {
  private promptSubject = new BehaviorSubject<string>('');
  prompt$ = this.promptSubject.asObservable();

  private questionsSubject = new BehaviorSubject<string>('');
  questions$ = this.questionsSubject.asObservable();

  setPrompt(prompt: string): void {
    this.promptSubject.next(prompt);
  }

  setQuestions(questions: string): void {
    this.questionsSubject.next(questions);
  }
}