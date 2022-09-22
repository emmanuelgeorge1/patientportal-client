import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';

@Component({
  selector: 'app-demographics',
  templateUrl: './demographics.component.html',
  styleUrls: ['./demographics.component.css'],
})
export class DemographicsComponent implements OnInit {
  demographicsForm: FormGroup;
  submitted = false;
  patientDetails: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.demographicsForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      race: ['', [Validators.required]],
      education: ['', [Validators.required]],
      employment: [''],
      medicalHistory: ['', [Validators.required]],
      familyMedicalHistory: ['', [Validators.required]],
      surgeries: [''],
    });
  }

  get f() {
    return this.demographicsForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));
    if (this.demographicsForm.valid) {
      console.log(this.demographicsForm.value);
      this.profileService
        .patientDemographics(
          this.patientDetails.user_id,
          this.demographicsForm.value
        )
        .subscribe(
          (data) => {
            // this.toastr.success('Demographics Added succesful!!');
            this.router.navigate(['/dashboard/patient/landing/responseMsg']);
            console.log(JSON.stringify(data));
          },
          (err) => {
            console.log(JSON.stringify(err));
            this.toastr.error(err.error.email, 'Error!!');
          }
        );
    }
  }
}
