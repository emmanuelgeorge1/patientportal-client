import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PhysicaianDashboardRoutingModule } from './physicaian-dashboard-routing.module';
import { PhysicianHomeComponent } from './component/physician-home/physician-home.component';
import { LandingComponent } from './component/physician-landing-page/landing.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import {
  RecurrenceEditorModule,
  ScheduleModule,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  MonthAgendaService,
} from '@syncfusion/ej2-angular-schedule';
import { PatientDetailsComponent } from './component/patient-details/patient-details.component';
import { ViewPatientInfoComponent } from './component/view-patient-info/view-patient-info.component';
@NgModule({
  declarations: [
    PhysicianHomeComponent,
    LandingComponent,
    PatientDetailsComponent,
    ViewPatientInfoComponent,
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
    MatSortModule,
    RecurrenceEditorModule,
    MatTooltipModule,
    ScheduleModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PhysicaianDashboardRoutingModule,
  ],
  providers: [
    DatePipe,
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService,
  ],
})
export class PhysicaianDashboardModule {}
