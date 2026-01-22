import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownBugImage } from './unknown-bug-image';

describe('UknownBugImage', () => {
  let component: UnknownBugImage;
  let fixture: ComponentFixture<UnknownBugImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnknownBugImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnknownBugImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
