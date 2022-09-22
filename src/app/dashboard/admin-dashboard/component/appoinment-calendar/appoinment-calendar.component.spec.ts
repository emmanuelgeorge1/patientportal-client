import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentCalendarComponent } from './appoinment-calendar.component';

describe('AppoinmentCalendarComponent', () => {
  let component: AppoinmentCalendarComponent;
  let fixture: ComponentFixture<AppoinmentCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
