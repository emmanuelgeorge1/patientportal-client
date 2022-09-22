import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/services/auth.service';
import { MustMatch } from 'src/utils/customValidator';

@Component({
  selector: 'app-register-physician',
  templateUrl: './register-physician.component.html',
  styleUrls: ['./register-physician.component.css'],
})
export class RegisterPhysicianComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RegisterPhysicianComponent>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],

        email: ['', [Validators.required, Validators.email]],

        speciality: ['', [Validators.required]],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('[a-zA-Z0-9]*'),
          ],
        ],
        confirmPassword: [''],
        dob: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern('[0-9]*'),
          ],
        ],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
    this.registerForm.controls.password.valueChanges.subscribe((x) =>
      this.registerForm.controls.confirmPassword.updateValueAndValidity()
    );
  }
  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.authService.registerPhysician(this.registerForm.value).subscribe(
        (data) => {
          this.toastr.success(' Registration succesful!!');
          this.onClose();
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error!!');
        }
      );
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
