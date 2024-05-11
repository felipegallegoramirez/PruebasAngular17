import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonTimeComponent } from './admon-time.component';

describe('AdmonTimeComponent', () => {
  let component: AdmonTimeComponent;
  let fixture: ComponentFixture<AdmonTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmonTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmonTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
