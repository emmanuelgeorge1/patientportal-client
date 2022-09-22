import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, DashboardRoutingModule],
  providers: [ProfileService],
})
export class DashboardModule {}
