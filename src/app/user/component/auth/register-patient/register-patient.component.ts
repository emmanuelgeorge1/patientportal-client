import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/services/auth.service';
import { MustMatch } from '../../../../../utils/customValidator';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
})
export class RegisterPatientComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public toastr: ToastrService,
    private router: Router
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
      this.authService.registerPatient(this.registerForm.value).subscribe(
        (data) => {
          this.toastr.success('Please Log In', ' Registration succesful!!');
          this.router.navigate(['/user/login-Patient']);
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error!!');
        }
      );
    }
  }
}
