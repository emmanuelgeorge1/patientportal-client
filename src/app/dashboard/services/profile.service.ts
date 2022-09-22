import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentElement } from '../patient-dashboard/model/patientAppointment';
import { patientDemographics } from '../patient-dashboard/model/demographicsData';
// import { Gallery } from '../patient-dashboard/model/UserProfilePic';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getPatientData(): Observable<any> {
    return this.http.get(environment.target + '/api/profile/patientDatas');
  }
  getPhysicianData(): Observable<any> {
    return this.http.get(environment.target + '/api/profile/physicianDatas');
  }
  removePatientDataFromDB(user_id: any) {
    return this.http.delete(
      environment.target + '/api/profile/deletePatientDatas/' + user_id
    );
  }
  removePhysiciantDataFromDB(user_id: any) {
    return this.http.delete(
      environment.target + '/api/profile/deletePhysicianDatas/' + user_id
    );
  }
  patientAppointments(user_id: any, appointment: AppointmentElement) {
    return this.http.post(
      environment.target + '/api/profile/appointment/' + user_id,
      appointment
    );
  }
  appointmentsDetails(user_id: any): Observable<any> {
    return this.http.get(
      environment.target + '/api/profile/appointmentDetail/' + user_id
    );
  }
  removeAppointmentDataFromDB(user_id: any, appoint_id: any) {
    return this.http.delete(
      environment.target +
        '/api/profile/deleteAppointment/' +
        user_id +
        '/' +
        appoint_id
    );
  }

  appointmentApproval(user_id: any, appoint_id: any, appointment_status: any) {
    let req = {
      appointment_status: appointment_status,
    };
    return this.http.patch(
      environment.target +
        '/api/profile/Approval/' +
        user_id +
        '/' +
        appoint_id,
      req
    );
  }
  patientDemographics(
    user_id: any,
    patientDemo: patientDemographics
  ): Observable<any> {
    return this.http.post(
      environment.target + '/api/profile/patientDemographics/' + user_id,
      patientDemo
    );
  }
  patientMedications(user_id: any, patientMed: any): Observable<any> {
    return this.http.post(
      environment.target + '/api/profile/medicationDetails/' + user_id,
      patientMed
    );
  }
  getPatientDemographics(user_id: any): Observable<any> {
    return this.http.get(
      environment.target + '/api/profile/getPatientDemographics/' + user_id
    );
  }

  getMedicationDetails(user_id: any): Observable<any> {
    return this.http.get(
      environment.target + '/api/profile/getMedicationDetails/' + user_id
    );
  }
  physicianFeedback(user_id: any, appoint_id: any, noteFromDoc: any) {
    return this.http.patch(
      environment.target +
        '/api/profile/physicianNote/' +
        user_id +
        '/' +
        appoint_id,
      noteFromDoc
    );
  }
  uploadProfilePicture(user_id: any, profilePicture: any): Observable<any> {
    return this.http.post(
      environment.target + '/api/profile/uploadImg/' + user_id,
      profilePicture
    );
  }
  getProfilePic(user_id: any): Observable<any> {
    return this.http.get(
      environment.target + '/api/profile/getProfilePic/' + user_id
    );
  }
  getAppointmentsRecord(): Observable<any> {
    return this.http.get(environment.target + '/api/profile/AppoimentRecords/');
  }
}
