import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleAppointmentComponent } from './schedule-appointment.component';

xdescribe('ScheduleAppointmentComponent', () => {
  let component: ScheduleAppointmentComponent;
  let fixture: ComponentFixture<ScheduleAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleAppointmentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
