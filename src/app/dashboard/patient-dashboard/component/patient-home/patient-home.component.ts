import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css'],
})
export class PatientHomeComponent implements OnInit {
  appointmentData: any = {};
  patientDetails: any = {};
  appointmentFlag: boolean = false;
  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {}
  displayedColumns: string[] = [
    'Date',
    'Time',
    'Speciality',
    'Physician',
    'actions',
  ];
  ngOnInit(): void {
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));

    this.profileService
      .appointmentsDetails(this.patientDetails.user_id)
      .subscribe(
        (res) => {
          this.appointmentData = res;
          this.appointmentFlag = res.length != 0 ? true : false;
        },
        (err) => {
          console.log('Error::::', JSON.stringify(err));
          this.appointmentFlag = false;
        }
      );
  }
  delete(appointmentData: any, i: any) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to cancel your Appointment?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.profileService
            .removeAppointmentDataFromDB(
              this.patientDetails.user_id,
              appointmentData.appoint_id
            )
            .subscribe(
              (res) => {
                this.appointmentData.splice(i, 1);
                this.appointmentData = [...this.appointmentData];
                this.toastr.success('Appointment Cancelled!!');
              },
              (err) => {
                this.toastr.error(err.error.message, 'Error!!');
              }
            );
        }
      });
  }
}
