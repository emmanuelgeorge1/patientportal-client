import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should be created', () => {
    expect(service).toBeDefined();
  });
  it('loginPatient()', () => {
    const testData = true;
    const inputData = {
      email: 'patient',
      password: 'patient',
    };
    service
      .loginUser(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/users/login-Patient'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
  it('call loginPatient() failed', () => {
    const errmsg = 'status 500 error';
    const inputData = {
      email: 'atul@gmail.com',
      password: '12345678',
    };
    service.loginUser(inputData).subscribe(
      () => fail('should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(500, 'status');
        expect(error.error).toEqual(errmsg, 'message');
      }
    );
    const req = httpController.expectOne(
      environment.target + '/api/users/login-Patient'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(errmsg, { status: 500, statusText: 'Server Error' });
  });

  it('registerPatient()', () => {
    const testData = true;
    const inputData = {
      name: 'athul',
      email: 'atul@gmail.com',
      password: '12345678',
      dob: '20-05-1998',
      phone: 9539391470,
    };
    service
      .registerPatient(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/users/register-Patient'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
  it('registerPhysician()', () => {
    const testData = true;
    const inputData = {
      name: 'athul',
      email: 'atul@gmail.com',
      speciality: 'Cardiology',
      password: '12345678',
      dob: '20-05-1998',
      phone: 9539391470,
    };
    service
      .registerPhysician(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/users/register-physician'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
  it(' registerAdmin()', () => {
    const testData = true;
    const inputData = {
      name: 'athul',
      email: 'atul@gmail.com',
      password: '12345678',
      dob: '20-05-1998',
      phone: 9539391470,
    };
    service
      .registerAdmin(inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/users/register-admin'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
});
