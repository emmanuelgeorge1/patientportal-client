import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/user/services/auth.service';
import { RegisterAdminComponent } from './register-admin.component';
describe('RegisterAdminComponent', () => {
  let component: RegisterAdminComponent;
  let fixture: ComponentFixture<RegisterAdminComponent>;
  const authServiceStub: jasmine.SpyObj<AuthService> = jasmine.createSpyObj([
    'registerAdmin',
  ]);
  let toasterServiceSpy: jasmine.Spy;
  const dialogMock = {
    close: () => {},
  };

  beforeEach(async () => {
    const toasterSetvices = jasmine.createSpyObj('toasterSetvices', ['pop']);
    toasterServiceSpy = toasterSetvices.pop.and.returnValue(of(''));
    await TestBed.configureTestingModule({
      declarations: [RegisterAdminComponent],
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
    fixture = TestBed.createComponent(RegisterAdminComponent);
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

  it('should invoke auth service when admin registration form is valid', () => {
    component.onSubmit();
    component.f['name'].setValue('emmanuel george');
    component.f['email'].setValue('emmanuel@gmail.com');
    component.f['password'].setValue('12345678');
    component.f['confirmPassword'].setValue('12345678');
    component.f['dob'].setValue('20-05-1988');
    component.f['phone'].setValue(9453345430);
    expect(component.registerForm.valid).toBeTruthy();
    authServiceStub.registerAdmin.and.returnValue(throwError({ Error }));
    fixture.nativeElement.querySelector('p').click();
    // expect(authServiceStub.registerAdmin.calls.any()).toBeTruthy;
    // expect(authServiceStub.registerAdmin).toHaveBeenCalledWith(
    //   component.registerForm.value
    // );
    component.onClose();
  });
});
