import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Encyclopedia } from './encyclopedia';

describe('Encyclopedia', () => {
  let component: Encyclopedia;
  let fixture: ComponentFixture<Encyclopedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Encyclopedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Encyclopedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
