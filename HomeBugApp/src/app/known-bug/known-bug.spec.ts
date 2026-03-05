import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownBug } from './known-bug';

describe('KnownBug', () => {
  let component: KnownBug;
  let fixture: ComponentFixture<KnownBug>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnownBug]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnownBug);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
