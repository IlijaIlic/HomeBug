import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownBug } from './unknown-bug';

describe('UnknownBug', () => {
  let component: UnknownBug;
  let fixture: ComponentFixture<UnknownBug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownBug]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownBug);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
