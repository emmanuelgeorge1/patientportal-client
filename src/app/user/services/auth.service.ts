import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterPatient } from '../model/register-patient';
import { RegisterPhysician } from '../model/register-physician';
import { RegisterAdmin } from '../model/register-admin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerPatient(Patient: RegisterPatient): Observable<any> {
    return this.http.post(
      environment.target + '/api/users/register-Patient',
      Patient
    );
  }

  registerPhysician(physician: RegisterPhysician): Observable<any> {
    return this.http.post(
      environment.target + '/api/users/register-physician',
      physician
    );
  }
  registerAdmin(admin: RegisterAdmin): Observable<any> {
    return this.http.post(
      environment.target + '/api/users/register-admin',
      admin
    );
  }
  loginUser(user: any): Observable<any> {
    return this.http.post(
      environment.target + '/api/users/login-Patient',
      user
    );
  }
}
