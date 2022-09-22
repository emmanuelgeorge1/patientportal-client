import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPatientInfoComponent } from './component/view-patient-info/view-patient-info.component';

import { PhysicianHomeComponent } from './component/physician-home/physician-home.component';
import { LandingComponent } from './component/physician-landing-page/landing.component';
import { PatientDetailsComponent } from './component/patient-details/patient-details.component';

const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      { path: 'home', component: PhysicianHomeComponent },
      { path: 'viewPatientInfo/:user_id', component: ViewPatientInfoComponent },
      { path: 'patient-details', component: PatientDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicaianDashboardRoutingModule {}
