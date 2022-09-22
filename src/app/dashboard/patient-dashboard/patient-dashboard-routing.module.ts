import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentHistoryComponent } from './component/appointment-history/appointment-history.component';
import { DemographicsComponent } from './component/demographics/demographics.component';
import { LandingPageComponent } from './component/patient-landing-page/landing-page.component';

import { PatientHomeComponent } from './component/patient-home/patient-home.component';
import { MedicationAndAllergiesComponent } from './component/medication-and-allergies/medication-and-allergies.component';

import { ProfileComponent } from './component/patient-profile/profile.component';
import { ResponseMessageComponent } from './component/response-message/response-message.component';
import { ScheduleAppointmentComponent } from './component/schedule-appointment/schedule-appointment.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    children: [
      { path: 'home', component: PatientHomeComponent },
      { path: 'profile', component: ProfileComponent },
      {
        path: 'appointment-history',
        component: AppointmentHistoryComponent,
      },
      {
        path: 'demographics',
        component: DemographicsComponent,
      },
      {
        path: 'medication-and-allergies',
        component: MedicationAndAllergiesComponent,
      },
      { path: 'schedule-appointment', component: ScheduleAppointmentComponent },
      { path: 'responseMsg', component: ResponseMessageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDashboardRoutingModule {
  constructor() {}
}
