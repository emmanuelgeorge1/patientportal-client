import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { LandingPageComponent } from './component/admin-landing-page/landing-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { ManagePhysicianRecordsComponent } from './component/manage-physician-records/manage-physician-records.component';
import { ManagePatientRecordsComponent } from './component/manage-patient-records/manage-patient-records.component';
import { ManageAppointmentsComponent } from './component/manage-appointments/manage-appointments.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { AppoinmentCalendarComponent } from './component/appoinment-calendar/appoinment-calendar.component';
import { MatSelectModule } from '@angular/material/select';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  RecurrenceEditorModule,
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ViewCalanderComponent } from './component/view-calander/view-calander.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    LandingPageComponent,
    ManagePhysicianRecordsComponent,
    ManagePatientRecordsComponent,
    ManageAppointmentsComponent,
    AppoinmentCalendarComponent,
    ViewCalanderComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    RecurrenceEditorModule,
    ScheduleModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    MatTooltipModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    DateTimePickerModule,
    NgApexchartsModule,
    AdminDashboardRoutingModule,
  ],
  providers: [
    DatePipe,
    DialogService,
    DatePipe,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
})
export class AdminDashboardModule {}
