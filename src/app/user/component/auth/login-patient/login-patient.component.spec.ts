import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';

import { LoginPatientComponent } from './login-patient.component';

describe('LoginPatientComponent', () => {
  let component: LoginPatientComponent;
  let fixture: ComponentFixture<LoginPatientComponent>;
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj([
    'loginPatient',
  ]);
  let RouterMock = {
    navigate: jasmine.createSpy('navigate'),
  };
  let toasterServiceSpy: jasmine.Spy;
  beforeEach(async () => {
    const toasterSetvices = jasmine.createSpyObj('toasterSetvices', ['pop']);
    toasterServiceSpy = toasterSetvices.pop.and.returnValue(of(''));
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginPatientComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: ToastrService, useValue: toasterSetvices },
        { provide: Router, useValue: RouterMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPatientComponent);

    component = fixture.componentInstance;
    expect(component.submitted).toEqual(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should check users email adress is invalid', () => {
    let email = component.f['email'];
    expect(email.valid).toBeFalsy();
    expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('abc');
    expect(email.errors['email']).toBeTruthy();
  });
  it('Should check users correct email adress is entered', () => {
    let email = component.f['email'];
    email.setValue('athul@gmail.com');
    expect(email.errors).toBeNull();
  });
  it('Should check password errors', () => {
    let pwd = component.f['password'];
    expect(pwd.errors['required']).toBeTruthy();
    pwd.setValue('');
  });
  it('Should check form is valid or not when values entered', () => {
    component.f['email'].setValue('emmanuel@gmail.com');
    component.f['password'].setValue('12345678');
    expect(component.loginForm.valid).toBeTruthy();
  });
  it('valid Credentials', () => {
    component.onSubmit();
    expect(component.submitted).toEqual(true);
    component.f['email'].setValue('emmanuel@gmail.com');
    component.f['password'].setValue('12345678');
    let response;
    authServiceStub.loginUser.and.returnValue(of(response));
    authServiceStub.loginUser.and.returnValue(throwError({ Error }));
    fixture.nativeElement.querySelector('button').click();
    expect(authServiceStub.loginUser.calls.any()).toBeTruthy();
    expect(authServiceStub.loginUser).toHaveBeenCalledWith(
      component.loginForm.value
    );
  });
});
