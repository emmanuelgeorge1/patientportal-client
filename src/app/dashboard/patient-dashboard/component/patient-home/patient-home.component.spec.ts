import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHomeComponent } from './patient-home.component';

xdescribe('LandingPageComponent', () => {
  let component: PatientHomeComponent;
  let fixture: ComponentFixture<PatientHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
