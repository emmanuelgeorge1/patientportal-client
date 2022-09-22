import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhysicianRecordsComponent } from './manage-physician-records.component';

xdescribe('ManagePhysicianRecordsComponent', () => {
  let component: ManagePhysicianRecordsComponent;
  let fixture: ComponentFixture<ManagePhysicianRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePhysicianRecordsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhysicianRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
