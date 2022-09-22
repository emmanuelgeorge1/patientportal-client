import { Component, OnInit } from '@angular/core';
import { PhysicianData } from 'src/app/dashboard/admin-dashboard/models/physician-data';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css'],
})
export class ScheduleAppointmentComponent {
  appointmentForm: FormGroup;
  submitted = false;
  elementData: Array<PhysicianData>;
  date: string;
  patientDetails: any = {};
  flip: boolean;
  physician: any = {};

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = this.formBuilder.group({
      speciality: ['', [Validators.required]],
      physician: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });

    this.profileService.getPhysicianData().subscribe((res) => {
      //   console.log('getPhysiciansDetails::::', JSON.stringify(res));
      this.elementData = res;
      // this.elementData = this.elementData.filter(function (elem, index, self) {
      //   return index === self.indexOf(elem);
      // });
    });
  }
  get f() {
    return this.appointmentForm.controls;
  }
  public minDate: Date = new Date();

  names: Array<PhysicianData>;

  changeSpecialty(count) {
    let speciality = count.target.value;
    this.names = this.elementData.filter((doc) => doc.speciality == speciality);
    console.log(this.names);
  }

  onSubmit() {
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));
    this.submitted = true;
    this.date = this.appointmentForm.value.date;
    if (this.appointmentForm.valid) {
      this.profileService
        .patientAppointments(
          this.patientDetails.user_id,
          this.appointmentForm.value
        )
        .subscribe(
          (res) => {
            localStorage.setItem(
              'physician',
              JSON.stringify(this.appointmentForm.value)
            );
            this.physician = JSON.parse(localStorage.getItem('physician'));
            this.flip = true;
          },
          (err) => {
            this.toastr.error(err.error.noprofile, 'Error!!');
          }
        );
    }
  }
}
