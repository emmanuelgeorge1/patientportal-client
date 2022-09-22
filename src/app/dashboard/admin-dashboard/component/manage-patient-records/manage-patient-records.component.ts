import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PatientData } from 'src/app/dashboard/admin-dashboard/models/patient-data';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { DialogService } from 'src/app/shared/service/dialog.service';

@Component({
  selector: 'app-manage-patient-records',
  templateUrl: './manage-patient-records.component.html',
  styleUrls: ['./manage-patient-records.component.css'],
})
export class ManagePatientRecordsComponent implements OnInit {
  profile: any = [];
  elementData: Array<PatientData>;
  constructor(
    private profileService: ProfileService,
    private dialogService: DialogService,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.profileService.getPatientData().subscribe(
      (res) => {
        // console.log('getPatientDetails::::', JSON.stringify(res));
        this.elementData = res;
        this.elementData.map((data: any) => {
          data.createdAt = this.datePipe.transform(
            data.createdAt,
            'dd-MMM-yyyy'
          );
        });
        console.log(this.elementData);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
  }

  delete(elementData: any, i: any) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this patient record?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.profileService
            .removePatientDataFromDB(elementData.user_id)
            .subscribe(
              (res) => {
                this.elementData.splice(i, 1);
                this.elementData = [...this.elementData];
                this.toastr.success('Deleted!!');
              },
              (err) => {
                this.toastr.error(err.error.message, 'Error!!');
              }
            );
        }
      });
  }
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'phone',
    'created',
    'actions',
  ];
}
