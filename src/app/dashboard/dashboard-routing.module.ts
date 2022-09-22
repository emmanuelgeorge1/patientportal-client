import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/guards/auth-guard.guard';

const routes: Routes = [
  {
    path: 'patient',
    loadChildren: () =>
      import('./patient-dashboard/patient-dashboard.module').then(
        (m) => m.PatientDashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'physician',
    loadChildren: () =>
      import('./physician-dashboard/physicaian-dashboard.module').then(
        (m) => m.PhysicaianDashboardModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-dashboard/admin-dashboard.module').then(
        (m) => m.AdminDashboardModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
