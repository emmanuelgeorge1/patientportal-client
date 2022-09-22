import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianHomeComponent } from './physician-home.component';

xdescribe('HomeComponent', () => {
  let component: PhysicianHomeComponent;
  let fixture: ComponentFixture<PhysicianHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhysicianHomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
