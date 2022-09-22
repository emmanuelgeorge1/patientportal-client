import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { SubjectService } from 'src/app/shared/service/subject.service';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-login-patient',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.css'],
})
export class LoginPatientComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private login: FormBuilder,
    private authService: AuthService,
    private subjectService: SubjectService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.loginForm = this.login.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(
        (res) => {
          if (res.role == 'Patient') {
            localStorage.setItem('token', JSON.stringify(res.token));

            localStorage.setItem(
              'patientDetails',
              JSON.stringify(jwt_decode(res.token))
            );
            this.subjectService.loginSubject.next(true);
            this.toastr.success('Login Succesfull', 'Wellcome!!');
            this.router.navigate(['/dashboard/patient/landing/home']);
          }
          if (res.role == 'admin') {
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem(
              'adminDetails',
              JSON.stringify(jwt_decode(res.token))
            );

            this.subjectService.loginSubject.next(true);
            this.toastr.success('Login Succesfull', 'Wellcome!!');
            this.router.navigate(['/dashboard/admin/landing/home']);
          }
          if (res.role == 'physician') {
            localStorage.setItem('token', JSON.stringify(res.token));
            localStorage.setItem(
              'physicianDetails',
              JSON.stringify(jwt_decode(res.token))
            );

            this.subjectService.loginSubject.next(true);
            this.toastr.success('Login Succesfull', 'Wellcome!!');
            this.router.navigate(['/dashboard/physician/landing/home']);
          }
        },
        (err) => {
          this.toastr.error(err.error.message, 'Error!!');
        }
      );
    }
  }
}
