import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UknownBugImage } from './uknown-bug-image';

describe('UknownBugImage', () => {
  let component: UknownBugImage;
  let fixture: ComponentFixture<UknownBugImage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UknownBugImage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UknownBugImage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
