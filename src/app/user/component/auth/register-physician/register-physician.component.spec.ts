import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { RegisterPhysicianComponent } from './register-physician.component';

describe('RegisterPhysicianComponent', () => {
  let component: RegisterPhysicianComponent;
  let fixture: ComponentFixture<RegisterPhysicianComponent>;
  const dialogMock = {
    close: () => {},
  };
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj([
    'registerPhysician',
  ]);
  let toasterServiceSpy: jasmine.Spy;
  beforeEach(async () => {
    const toasterSetvices = jasmine.createSpyObj('toasterSetvices', ['pop']);
    toasterServiceSpy = toasterSetvices.pop.and.returnValue(of(''));
    await TestBed.configureTestingModule({
      declarations: [RegisterPhysicianComponent],
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
        ToastrModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: ToastrService, useValue: toasterSetvices },
        { provide: MatDialogRef, useValue: dialogMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPhysicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form should be invalid', waitForAsync(() => {
    component.f['name'].setValue('');
    component.f['email'].setValue('');
    component.f['speciality'].setValue('');
    component.f['password'].setValue('');
    component.f['confirmPassword'].setValue('');
    component.f['dob'].setValue('');
    component.f['phone'].setValue('');
    expect(component.registerForm.valid).toBeFalsy();
    component.onClose();
  }));
  it('should invoke auth service when admin registration form is valid', () => {
    component.onSubmit();
    component.f['name'].setValue('emmanuel george');
    component.f['email'].setValue('emmanuel@gmail.com');
    component.f['speciality'].setValue('cardiolagy');
    component.f['password'].setValue('12345678');
    component.f['confirmPassword'].setValue('12345678');
    component.f['dob'].setValue('20-05-1988');
    component.f['phone'].setValue(9453345430);
    expect(component.registerForm.valid).toBeTruthy();
  });
});
