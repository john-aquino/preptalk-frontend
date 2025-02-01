import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewPromptComponent } from './interview-prompt.component';

describe('InterviewPromptComponent', () => {
  let component: InterviewPromptComponent;
  let fixture: ComponentFixture<InterviewPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewPromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
