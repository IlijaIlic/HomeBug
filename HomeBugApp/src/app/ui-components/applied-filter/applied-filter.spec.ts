import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFilter } from './applied-filter';

describe('AppliedFilter', () => {
  let component: AppliedFilter;
  let fixture: ComponentFixture<AppliedFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliedFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
