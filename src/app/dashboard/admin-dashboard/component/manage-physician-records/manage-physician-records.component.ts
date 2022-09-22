import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { DialogService } from 'src/app/shared/service/dialog.service';
import { PhysicianData } from '../../models/physician-data';

@Component({
  selector: 'app-manage-physician-records',
  templateUrl: './manage-physician-records.component.html',
  styleUrls: ['./manage-physician-records.component.css'],
})
export class ManagePhysicianRecordsComponent implements OnInit {
  profile: any = [];
  elementData: Array<PhysicianData>;
  constructor(
    private profileService: ProfileService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.profileService.getPhysicianData().subscribe(
      (res) => {
        // console.log('getPatientDetails::::', JSON.stringify(res));
        this.elementData = res;
        this.elementData.map((data: any) => {
          data.createdAt = this.datePipe.transform(
            data.createdAt,
            'dd-MMM-yyyy'
          );
        });
        //  console.log(this.elementData);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
  }

  delete(elementData: any, i: any) {
    this.dialogService
      .openConfirmDialog(
        'Are you sure you want to delete this physician record?'
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.profileService
            .removePhysiciantDataFromDB(elementData.user_id)
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
    'speciality',
    'phone',
    'created',
    'actions',
  ];
}
