import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { RegisterPatientComponent } from './register-patient.component';

describe('RegisterPatientComponent', () => {
  let component: RegisterPatientComponent;
  let fixture: ComponentFixture<RegisterPatientComponent>;
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj([
    'registerPatient',
  ]);

  let toasterServiceSpy: jasmine.Spy;

  let routerSpy = { navigate: jasmine.createSpy('navigate') };
  beforeEach(async () => {
    const toasterSetvices = jasmine.createSpyObj('toasterSetvices', ['pop']);
    toasterServiceSpy = toasterSetvices.pop.and.returnValue(of(''));
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        ToastrModule,
      ],
      declarations: [RegisterPatientComponent],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: ToastrService, useValue: toasterSetvices },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should be invalid', waitForAsync(() => {
    component.f['name'].setValue('');
    component.f['email'].setValue('');
    component.f['password'].setValue('');
    component.f['confirmPassword'].setValue('');
    component.f['dob'].setValue('');
    component.f['phone'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
  }));
  it('Form should be valid', waitForAsync(() => {
    component.onSubmit();
    component.f['name'].setValue('emmanuel george');
    component.f['email'].setValue('emmanuel@gmail.com');
    component.f['password'].setValue('12345678');
    component.f['confirmPassword'].setValue('12345678');
    component.f['dob'].setValue('20-05-1988');
    component.f['phone'].setValue(1234567890);
    expect(component.registerForm.valid).toBeTruthy();
  }));

  it('should invoke auth service when patient registerForm is valid', () => {
    component.f['name'].setValue('emmanuel george');
    component.f['email'].setValue('emmanuel@gmail.com');
    component.f['password'].setValue('12345678');
    component.f['confirmPassword'].setValue('12345678');
    component.f['dob'].setValue('20-05-1988');
    component.f['phone'].setValue(9453345430);
    authServiceStub.registerPatient.and.returnValue(throwError({ Error }));
    fixture.nativeElement.querySelector('button').click();
    expect(authServiceStub.registerPatient.calls.any()).toBeTruthy();
    expect(authServiceStub.registerPatient).toHaveBeenCalledWith(
      component.registerForm.value
    );
    // expect(routerSpy.navigate).toHaveBeenCalledWith('/user/login-Patient');
  });
  // it('Hit the Resgister Button', () => {
  //   const fixtureInstance = TestBed.createComponent<RegisterPatientComponent>(
  //     RegisterPatientComponent
  //   );
  //   fixtureInstance.componentInstance.toastr;
  //   fixtureInstance.detectChanges();
  //   component.onSubmit();
  //   expect(toasterServiceSpy.calls.any()).toHaveBeenCalled();
  // });
});
