import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PatientDashboardRoutingModule } from './patient-dashboard-routing.module';
import { LandingPageComponent } from './component/patient-landing-page/landing-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './component/patient-profile/profile.component';
import { ScheduleAppointmentComponent } from './component/schedule-appointment/schedule-appointment.component';
import { AppointmentHistoryComponent } from './component/appointment-history/appointment-history.component';
import { DemographicsComponent } from './component/demographics/demographics.component';
import { MedicationAndAllergiesComponent } from './component/medication-and-allergies/medication-and-allergies.component';
import { PatientHomeComponent } from './component/patient-home/patient-home.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatTableModule } from '@angular/material/table';
import { FlipModule } from 'ngx-flip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { ResponseMessageComponent } from './component/response-message/response-message.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    ProfileComponent,
    ScheduleAppointmentComponent,
    AppointmentHistoryComponent,
    DemographicsComponent,
    MedicationAndAllergiesComponent,
    PatientHomeComponent,
    ResponseMessageComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    DateTimePickerModule,
    MatTooltipModule,
    FlipModule,
    PatientDashboardRoutingModule,
  ],
  exports: [],
  providers: [DatePipe, DialogService],
})
export class PatientDashboardModule {
  constructor() {}
}
