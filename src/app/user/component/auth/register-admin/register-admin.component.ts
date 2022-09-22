import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/services/auth.service';
import { MustMatch } from 'src/utils/customValidator';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css'],
})
export class RegisterAdminComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<RegisterAdminComponent>
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],

        email: ['', [Validators.required, Validators.email]],

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
      this.authService.registerAdmin(this.registerForm.value).subscribe(
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
