import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-manage-appointments',
  templateUrl: './manage-appointments.component.html',
  styleUrls: ['./manage-appointments.component.css'],
})
export class ManageAppointmentsComponent implements OnInit {
  paientData: any[] = [];
  viewData: any = {};

  constructor(
    private profileService: ProfileService,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.profileService.getPatientData().subscribe(
      (res) => {
        this.paientData = res.filter((a) => a.appointment.length > 0);
        console.log(this.paientData);
        // a.appointment.appointment_status!=null
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'phone',
    'speciality',
    'physician',
    'status',
    'time',
    'date',
    'actions',
  ];

  Approve(user_id, appoint_id, appointment_status) {
    this.profileService
      .appointmentApproval(user_id, appoint_id, appointment_status)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Approved!!');
            this.profileService.getPatientData().subscribe(
              (res) => {
                this.paientData = res.filter((a) => a.appointment.length > 0);
                console.log(this.paientData);
                // a.appointment.appointment_status!=null
              },
              (err) => {
                console.log('Error::::', JSON.stringify(err));
              }
            );
            localStorage.removeItem('rejectedAppointments');
            localStorage.removeItem('approvedAppointment');
            localStorage.removeItem('pendingAppointments');
            this.profileService.getAppointmentsRecord().subscribe((res) => {
              res.map((data: any) => {
                if (data.rejectedAppointments) {
                  localStorage.setItem(
                    'rejectedAppointments',
                    JSON.stringify(data.rejectedAppointments)
                  );
                }
                if (data.pendingAppointments) {
                  localStorage.setItem(
                    'pendingAppointments',
                    JSON.stringify(data.pendingAppointments)
                  );
                }
                if (data.approvedAppointment) {
                  localStorage.setItem(
                    'approvedAppointment',
                    JSON.stringify(data.approvedAppointment)
                  );
                }
              });
            });
          }
        },
        (err) => {
          console.log('Error::::', JSON.stringify(err));
        }
      );
    console.log(user_id + '--' + appoint_id + '--' + appointment_status);
  }
  Reject(user_id, appoint_id, appointment_status) {
    this.profileService
      .appointmentApproval(user_id, appoint_id, appointment_status)
      .subscribe(
        (res) => {
          if (res) {
            this.toastr.error('Rejected!!');
            this.profileService.getPatientData().subscribe(
              (res) => {
                this.paientData = res.filter((a) => a.appointment.length > 0);
                console.log(this.paientData);
                // a.appointment.appointment_status!=null
              },
              (err) => {
                console.log('Error::::', JSON.stringify(err));
              }
            );

            localStorage.removeItem('rejectedAppointments');
            localStorage.removeItem('approvedAppointment');
            localStorage.removeItem('pendingAppointments');
            this.profileService.getAppointmentsRecord().subscribe((res) => {
              res.map((data: any) => {
                if (data.rejectedAppointments) {
                  localStorage.setItem(
                    'rejectedAppointments',
                    JSON.stringify(data.rejectedAppointments)
                  );
                }
                if (data.pendingAppointments) {
                  localStorage.setItem(
                    'pendingAppointments',
                    JSON.stringify(data.pendingAppointments)
                  );
                }
                if (data.approvedAppointment) {
                  localStorage.setItem(
                    'approvedAppointment',
                    JSON.stringify(data.approvedAppointment)
                  );
                }
              });
            });
          }
        },
        (err) => {
          console.log('Error::::', JSON.stringify(err));
        }
      );
    console.log(user_id + '--' + appoint_id + '--' + appointment_status);
  }
}
