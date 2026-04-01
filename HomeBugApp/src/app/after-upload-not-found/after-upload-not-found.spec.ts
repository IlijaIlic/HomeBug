import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterUploadNotFound } from './after-upload-not-found';

describe('AfterUploadNotFound', () => {
  let component: AfterUploadNotFound;
  let fixture: ComponentFixture<AfterUploadNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterUploadNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterUploadNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
