import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationAndAllergiesComponent } from './medication-and-allergies.component';

xdescribe('MedicationAndAllergiesComponent', () => {
  let component: MedicationAndAllergiesComponent;
  let fixture: ComponentFixture<MedicationAndAllergiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicationAndAllergiesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationAndAllergiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
