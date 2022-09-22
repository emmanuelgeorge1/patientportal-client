import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCalanderComponent } from './view-calander.component';

describe('ViewCalanderComponent', () => {
  let component: ViewCalanderComponent;
  let fixture: ComponentFixture<ViewCalanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCalanderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCalanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
