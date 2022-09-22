import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
@Component({
  selector: 'app-view-patient-info',
  templateUrl: './view-patient-info.component.html',
  styleUrls: ['./view-patient-info.component.css'],
})
export class ViewPatientInfoComponent implements OnInit {
  deomorphicsDatas: any[] = [];
  medicationDatas: any[] = [];
  elementData: any[] = [];
  physicianDetails: any = {};
  patientDetails: any = {};
  physicianNote: FormGroup;
  submitted = false;
  imageUrl: string;
  userId: string;
  appointId: any;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private profileService: ProfileService,
    private readonly sanitizer: DomSanitizer
  ) {}

  public get safeUrlPic(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }
  ngOnInit(): void {
    this.physicianNote = this.formBuilder.group({
      noteFromDoc: ['', [Validators.required]],
    });
    this.physicianDetails = JSON.parse(
      localStorage.getItem('physicianDetails')
    );
    this.userId = this.activatedRoute.snapshot.paramMap.get('user_id');
    console.log(this.userId);
    this.profileService.getPatientDemographics(this.userId).subscribe(
      (res) => {
        this.deomorphicsDatas = res;

        console.log(this.deomorphicsDatas);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
    this.profileService.getMedicationDetails(this.userId).subscribe(
      (res) => {
        this.medicationDatas = res;

        console.log(this.medicationDatas);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
    this.profileService.appointmentsDetails(this.userId).subscribe(
      (res) => {
        this.elementData = res;

        this.elementData = this.elementData.filter(
          (b) =>
            b.appointment_status == 'Approved' &&
            b.physician == this.physicianDetails.name
        );
        this.appointId = this.elementData.map(function (a) {
          return a['appoint_id'];
        });
        console.log(this.elementData);
        console.log(this.appointId);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err));
      }
    );
    this.profileService.getProfilePic(this.userId).subscribe(
      (res) => {
        this.imageUrl = res;
        console.log(this.imageUrl);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err.error.noprofile));
      }
    );
  }
  get f() {
    return this.physicianNote.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.physicianNote.valid) {
      this.profileService
        .physicianFeedback(
          this.userId,
          this.appointId,
          this.physicianNote.value
        )
        .subscribe(
          (res) => {
            if (res) {
            }
            this.toastr.success('success!!');
          },
          (err) => {
            console.log('Error::::', JSON.stringify(err));
          }
        );
    }
  }
}
