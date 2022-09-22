import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { AppointmentHistory } from '../../model/appointmentHistory';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css'],
})
export class AppointmentHistoryComponent implements OnInit {
  elementData: Array<AppointmentHistory>;
  patientDetails: any = {};
  constructor(
    private profileService: ProfileService,

    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));
    this.profileService
      .appointmentsDetails(this.patientDetails.user_id)
      .subscribe(
        (res) => {
          // console.log('getPatientDetails::::', JSON.stringify(res));
          this.elementData = res;
          this.elementData.map((data: any) => {
            data.date = this.datePipe.transform(data.date, 'dd-MMM-yyyy');
          });
          console.log(this.elementData);
        },
        (err) => {
          console.log('Error::::', JSON.stringify(err));
        }
      );
  }
  displayedColumns: string[] = ['date', 'physician', 'status', 'notes'];
}
