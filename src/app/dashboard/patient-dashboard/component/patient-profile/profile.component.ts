import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/dashboard/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  patientDetails: any = {};
  profile: any[] = [];
  _userId: any = '';
  deomorphicsDatas: any[] = [];
  medicationDatas: any[] = [];

  imageUrl: string;
  constructor(
    private profileService: ProfileService,
    private readonly sanitizer: DomSanitizer
  ) {}
  public get safeUrlPic(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }
  ngOnInit(): void {
    this._userId = JSON.parse(localStorage.getItem('patientDetails')).user_id;

    console.log(this._userId);
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));

    this.profileService.getProfilePic(this.patientDetails.user_id).subscribe(
      (res) => {
        this.imageUrl = res;
        console.log(this.imageUrl);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err.error.noprofile));
      }
    );
  }

  demographicsInfo() {
    this.profileService
      .getPatientDemographics(this.patientDetails.user_id)
      .subscribe(
        (res) => {
          // console.log('getPatientDetails::::', JSON.stringify(res));
          this.deomorphicsDatas = res;

          console.log(this.deomorphicsDatas);
        },
        (err) => {
          console.log('Error::::', JSON.stringify(err));
        }
      );
  }
  medicationInfo() {
    this.profileService
      .getMedicationDetails(this.patientDetails.user_id)
      .subscribe(
        (res) => {
          // console.log('getPatientDetails::::', JSON.stringify(res));
          this.medicationDatas = res;

          console.log(this.medicationDatas);
        },
        (err) => {
          console.log('Error::::', JSON.stringify(err));
        }
      );
  }
}
