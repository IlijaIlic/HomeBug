import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterUpload } from './after-upload';

describe('AfterUpload', () => {
  let component: AfterUpload;
  let fixture: ComponentFixture<AfterUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
