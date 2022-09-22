import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPatientComponent } from './component/auth/login-patient/login-patient.component';

import { RegisterAdminComponent } from './component/auth/register-admin/register-admin.component';
import { RegisterPatientComponent } from './component/auth/register-patient/register-patient.component';
import { RegisterPhysicianComponent } from './component/auth/register-physician/register-physician.component';

const routes: Routes = [
  {
    path: 'register-Patient',
    component: RegisterPatientComponent,
  },
  {
    path: 'register-physician',
    component: RegisterPhysicianComponent,
  },
  {
    path: 'register-admin',
    component: RegisterAdminComponent,
  },
  {
    path: 'login-Patient',
    component: LoginPatientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
