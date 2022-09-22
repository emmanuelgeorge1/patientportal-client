import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { patientDemographics } from '../patient-dashboard/model/demographicsData';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    });
    service = TestBed.inject(ProfileService);
    httpController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpController.verify();
  });
  it('should be created', () => {
    expect(service).toBeDefined();
  });

  it('fetch PatientData()', () => {
    const testData = [
      {
        user_id: '619954bf16be688475274b3b',
        email: 'ashik@gmail.com',
        name: '  Ashik Kp',
        dob: '20-05_1997',
        phone: 9559491170,
        createdAt: '2021-11-20T20:04:15.231Z',
        appointment: [
          {
            speciality: 'Paediatrics',
            physician: 'Haritha K',
            date: '2021-12-08T09:31:44.000Z',
            appointment_status: 'Approved',
            _id: '61b07486b603c778016d5486',
          },
          {
            speciality: 'Pathology',
            physician: 'Jahed Kahn',
            date: '2021-11-30T16:47:54.000Z',
            _id: '61a3b2c0b99d29d98b95454f',
            appointment_status: 'Approved',
          },
        ],
      },
      {
        user_id: '619956bd16be688475274b59',
        email: 'adhitya@gmail.com',
        name: '  Adithya S',
        dob: '20-05_1995',
        phone: 9559491170,
        createdAt: '2021-11-20T20:12:45.318Z',
        appointment: [],
      },
    ];

    service.getPatientData().subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/patientDatas'
    );
    expect(req.cancelled).toBeFalsy();

    req.flush(testData);
  });
  it('fetch PhysicianData()', () => {
    const testData = [
      {
        user_id: '6199528db80b52eed3c10c6d',
        email: 'varun@gmail.com',
        name: 'Varun M',
        speciality: 'Dermatologist',
        dob: '20-05_1988',
        phone: 9519391470,
        createdAt: '2021-11-20T19:54:53.674Z',
      },
      {
        user_id: '61995293b80b52eed3c10c70',
        email: 'haritha@gmail.com',
        name: 'Haritha K',
        speciality: 'Paediatrics',
        dob: '20-05_1988',
        phone: 9519391470,
        createdAt: '2021-11-20T19:54:59.491Z',
      },
    ];

    service.getPhysicianData().subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/physicianDatas'
    );
    expect(req.cancelled).toBeFalsy();

    req.flush(testData);
  });
  it('post patientAppointments()', () => {
    const testData = true;
    const inputData = {
      speciality: 'Paediatrics',
      physician: 'Haritha K',
      date: '2021-11-30T16',
    };
    let userId = '619954a316be688475274b34';
    service
      .patientAppointments(userId, inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/profile/appointment/' + userId
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
  it('fetch patient appointmentsDetails()', () => {
    const testData = [
      {
        appoint_id: '61b07486b603c778016d5486',
        speciality: 'Paediatrics',
        physician: 'Haritha K',
        date: '2021-12-08T09:31:44.000Z',
        appointment_status: 'Approved',
      },
      {
        appoint_id: '61a3b2c0b99d29d98b95454f',
        speciality: 'Pathology',
        physician: 'Jahed Kahn',
        date: '2021-11-30T16:47:54.000Z',
        appointment_status: 'Approved',
      },
    ];
    let userId = '619954bf16be688475274b3b';
    service.appointmentsDetails(userId).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/appointmentDetails/' + userId
    );
    expect(req.cancelled).toBeFalsy();
    req.flush(testData);
  });
  it('patch patient appointmentApproval()', () => {
    const testData = true;
    const inputData = {
      appointment_status: 'Approved',
    };
    let userId = '619954a316be688475274b34';
    let appointId = '61b07486b603c778016d5486';
    service
      .appointmentApproval(userId, appointId, inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/profile/Approval/' + userId + '/' + appointId
    );
    expect(req.request.method).toEqual('PATCH');
    req.flush(testData);
  });

  it('post patient Demographics()', () => {
    const testData = true;

    const inputData: patientDemographics = {
      firstName: 'athul',
      lastName: 'aji',
      gender: 'male',
      email: 'atul@gmail.com',
      address: 'Arimboor(H)',
      education: 'B. Tech',
      employment: 'Software Enggineer',
      medicalHistory: 'Nil',
      familyMedicalHistory: 'Nil',
      surgeries: 'Nil',
    };
    let userId = '619954a316be688475274b34';
    service
      .patientDemographics(userId, inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/profile/patientDemographics/' + userId
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });
  it('post patient MedicationDetails()', () => {
    const testData = true;

    const inputData = {
      currentMedication: 'antibiotics',
      otc: '',
      med: '',
      socialDrug: '',
      pastMed: 'paracetamol ',
      allergies: 'peanut',
      covidVacin: 'co-vaccine',
      otherAllergies: 'null',
    };
    let userId = '619954a316be688475274b34';
    service
      .patientMedications(userId, inputData)
      .subscribe((data) => expect(data).toEqual(testData));

    const req = httpController.expectOne(
      environment.target + '/api/profile/medicationDetails/' + userId
    );
    expect(req.request.method).toEqual('POST');
    req.flush(testData);
  });

  it('fetch patient Demographics()', () => {
    const testData = [
      {
        firstName: 'athul',
        lastName: 'aji',
        gender: 'male',
        email: 'atul@gmail.com',
        address: 'Arimboor(H)',
        education: 'B. Tech',
        employment: 'Software Enggineer',
        medicalHistory: 'Nil',
        familyMedicalHistory: 'Nil',
        surgeries: 'Nil',
      },
    ];
    let userId = '619954bf16be688475274b3b';
    service.getPatientDemographics(userId).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/getPatientDemographics/' + userId
    );
    expect(req.cancelled).toBeFalsy();
    req.flush(testData);
  });
  it('fetch patient MedicationDetails()', () => {
    const testData = [
      {
        currentMedication: 'antibiotics',
        otc: '',
        med: '',
        socialDrug: '',
        pastMed: 'paracetamol ',
        allergies: 'peanut',
        covidVacin: 'co-vaccine',
        otherAllergies: 'null',
      },
    ];
    let userId = '619954bf16be688475274b3b';
    service.getMedicationDetails(userId).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/getMedicationDetails/' + userId
    );
    expect(req.cancelled).toBeFalsy();
    req.flush(testData);
  });
  it(' delete the patient data From DB', () => {
    let userId = '619954bf16be688475274b3b';
    service.removePatientDataFromDB(userId).subscribe((data: any) => {
      expect(data).toBe(userId);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/deletePatientDatas/' + userId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(userId);
  });
  it(' delete the Physician data From DB', () => {
    let userId = '61995293b80b52eed3c10c70';
    service.removePhysiciantDataFromDB(userId).subscribe((data: any) => {
      expect(data).toBe(userId);
    });
    const req = httpController.expectOne(
      environment.target + '/api/profile/deletePhysicianDatas/' + userId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(userId);
  });
  it('delete the Appointment data of patient From DB', () => {
    let userId = '61995293b80b52eed3c10c70';
    let appointId = '61b07486b603c778016d5486';
    service
      .removeAppointmentDataFromDB(userId, appointId)
      .subscribe((data: any) => {
        expect(data).toBe(userId);
      });
    const req = httpController.expectOne(
      environment.target +
        '/api/profile/deleteAppointment/' +
        userId +
        '/' +
        appointId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush(userId);
  });
});
