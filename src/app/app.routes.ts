// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { InterviewPromptComponent } from './interview-prompt/interview-prompt.component';
import { InterviewQuestionsComponent } from './interview-questions/interview-questions.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },          // Page 1: Welcome
  { path: 'prompt', component: InterviewPromptComponent }, // Page 2: Interview Prompt
  { path: 'questions', component: InterviewQuestionsComponent } // Page 3: Generated Questions
];