import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComment } from './input-comment';

describe('InputComment', () => {
  let component: InputComment;
  let fixture: ComponentFixture<InputComment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
