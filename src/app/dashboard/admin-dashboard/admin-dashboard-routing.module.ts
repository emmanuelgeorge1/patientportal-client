import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { LandingPageComponent } from './component/admin-landing-page/landing-page.component';
import { AppoinmentCalendarComponent } from './component/appoinment-calendar/appoinment-calendar.component';
import { ManageAppointmentsComponent } from './component/manage-appointments/manage-appointments.component';
import { ManagePatientRecordsComponent } from './component/manage-patient-records/manage-patient-records.component';
import { ManagePhysicianRecordsComponent } from './component/manage-physician-records/manage-physician-records.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingPageComponent,
    children: [
      { path: 'home', component: AdminHomeComponent },
      { path: 'manage-patient', component: ManagePatientRecordsComponent },
      { path: 'manage-appointments', component: ManageAppointmentsComponent },
      { path: 'appointments-calendar', component: AppoinmentCalendarComponent },
      { path: 'manage-physician', component: ManagePhysicianRecordsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
