import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugMap } from './bug-map';

describe('BugMap', () => {
  let component: BugMap;
  let fixture: ComponentFixture<BugMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BugMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
