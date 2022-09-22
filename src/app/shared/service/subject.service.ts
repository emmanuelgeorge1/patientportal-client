import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  loginFlag: boolean = localStorage.getItem('token') != null;
  loginSubject: Subject<boolean> = new Subject();

  constructor(private router: Router) {}

  logoutPatient() {
    this.loginFlag = false;
    this.loginSubject.next(this.loginFlag);
    localStorage.clear();
    this.router.navigate(['/user/login-Patient']);
  }

  logout() {
    this.loginFlag = false;
    this.loginSubject.next(this.loginFlag);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
