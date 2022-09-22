import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseMessageComponent } from './response-message.component';

xdescribe('ResponseMessageComponent', () => {
  let component: ResponseMessageComponent;
  let fixture: ComponentFixture<ResponseMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponseMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
