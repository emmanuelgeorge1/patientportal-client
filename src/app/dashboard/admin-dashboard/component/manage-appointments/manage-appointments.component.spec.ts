import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppointmentsComponent } from './manage-appointments.component';

xdescribe('ManageAppointmentsComponent', () => {
  let component: ManageAppointmentsComponent;
  let fixture: ComponentFixture<ManageAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAppointmentsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
