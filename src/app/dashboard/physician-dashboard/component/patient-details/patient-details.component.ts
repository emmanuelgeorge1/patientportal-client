import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/dashboard/services/profile.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css'],
})
// const elementData: any[] = []
export class PatientDetailsComponent implements AfterViewInit {
  patientData: any = {};
  patientInfo: Array<any> = [];
  physicianDetails: any = {};
  PatientAppointment: Array<any> = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'phone',
    'date',
    'time',
    'actions',
  ];
  dataSource = new MatTableDataSource(this.patientInfo);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private profileService: ProfileService,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.physicianDetails = JSON.parse(
      localStorage.getItem('physicianDetails')
    );
    this.profileService.getPatientData().subscribe(
      (res) => {
        this.patientData = res.filter((a) => a.appointment.length > 0);
        for (let i = 0; i < this.patientData.length; i++) {
          let data = (this.patientData[i].appointment = this.patientData[
            i
          ].appointment.filter(
            (b) =>
              b.appointment_status == 'Approved' &&
              b.physician == this.physicianDetails.name
          ));
          if (data.length > 0) this.PatientAppointment.push(data[0]);
        }
        // if (data.length > 0) this.PatientAppointment.push(data[0]);
        this.patientInfo = this.patientData.filter(
          (a) => a.appointment.length > 0
        );
        console.log(this.PatientAppointment);
        console.log(this.patientInfo);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  viewDemo(user_id) {
    this.router.navigate([
      '/dashboard/physician/landing/viewPatientInfo/' + user_id,
    ]);
  }
  viewMed(user_id) {
    this.router.navigate([
      '/dashboard/physician/landing/viewPatientInfo/' + user_id,
    ]);
  }
}
