import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePatientRecordsComponent } from './manage-patient-records.component';

xdescribe('ManagePatientRecordsComponent', () => {
  let component: ManagePatientRecordsComponent;
  let fixture: ComponentFixture<ManagePatientRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePatientRecordsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePatientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
