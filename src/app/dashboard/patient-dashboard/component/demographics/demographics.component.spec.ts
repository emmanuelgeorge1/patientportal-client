import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicsComponent } from './demographics.component';

xdescribe('DemographicsComponent', () => {
  let component: DemographicsComponent;
  let fixture: ComponentFixture<DemographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemographicsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
