import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';

@Component({
  selector: 'app-medication-and-allergies',
  templateUrl: './medication-and-allergies.component.html',
  styleUrls: ['./medication-and-allergies.component.css'],
})
export class MedicationAndAllergiesComponent implements OnInit {
  medicationsForm: FormGroup;
  submitted = false;
  patientDetails: any = {};
  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.medicationsForm = this.formBuilder.group({
      currentMedication: ['', [Validators.required]],
      otc: [''],
      med: [''],
      socialDrug: [''],
      pastMed: ['', [Validators.required]],
      allergies: ['', [Validators.required]],
      covidVacin: ['', [Validators.required]],
      otherAllergies: ['', [Validators.required]],
    });
  }
  get f() {
    return this.medicationsForm.controls;
  }
  onSubmit() {
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));
    this.submitted = true;

    if (this.medicationsForm.valid) {
      this.profileService
        .patientMedications(
          this.patientDetails.user_id,
          this.medicationsForm.value
        )
        .subscribe(
          (res) => {
            this.router.navigate(['/dashboard/patient/landing/responseMsg']);
          },
          (err) => {
            this.toastr.error(err.error.msg, 'Error!!');
          }
        );
    }
  }
}
