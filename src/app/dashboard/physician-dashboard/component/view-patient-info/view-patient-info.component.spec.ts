import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientInfoComponent } from './view-patient-info.component';

xdescribe('CalendarViewComponent', () => {
  let component: ViewPatientInfoComponent;
  let fixture: ComponentFixture<ViewPatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPatientInfoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
