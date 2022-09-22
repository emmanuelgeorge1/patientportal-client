import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { ImageUploadService } from 'src/app/dashboard/services/image-upload.service';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { SubjectService } from 'src/app/shared/service/subject.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loginFlag: boolean = localStorage.getItem('token') != null;
  adminDetails: any = {};
  imageUrl: string;
  constructor(
    private observer: BreakpointObserver,
    private subjectService: SubjectService,
    private router: Router,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private readonly sanitizer: DomSanitizer,
    private imageUploadService: ImageUploadService
  ) {}
  public get safeUrlPic(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
  }
  ngOnInit(): void {
    debugger;
    this.profileService.getAppointmentsRecord().subscribe((res) => {
      res.map((data: any) => {
        if (data.totalAppointments) {
          localStorage.setItem(
            'totalAppointments',
            JSON.stringify(data.totalAppointments)
          );
        }
        if (data.approvedAppointment) {
          localStorage.setItem(
            'approvedAppointment',
            JSON.stringify(data.approvedAppointment)
          );
        }
        if (data.pendingAppointments) {
          localStorage.setItem(
            'pendingAppointments',
            JSON.stringify(data.pendingAppointments)
          );
        }
        if (data.rejectedAppointments) {
          localStorage.setItem(
            'rejectedAppointments',
            JSON.stringify(data.rejectedAppointments)
          );
        }
      });
    });
    this.adminDetails = JSON.parse(localStorage.getItem('adminDetails'));
    this.profileService.getProfilePic(this.adminDetails.user_id).subscribe(
      (res) => {
        this.imageUrl = res;
        console.log(this.imageUrl);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err.error.noprofile));
      }
    );
  }
  ngAfterViewInit() {
    // this.subjectService.logoutAdmin();
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
  logout() {
    this.subjectService.logoutPatient();
  }
  navigateUrl(path: string) {
    this.router.navigateByUrl(path);
  }
  uploadPicture(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageUploadService
      .uploadProfilePicture(this.adminDetails.user_id, file)
      .subscribe(
        (res) => {
          this.toastr.success('success!!');
          this.profileService
            .getProfilePic(this.adminDetails.user_id)
            .subscribe(
              (res) => {
                this.imageUrl = res;
                console.log(this.imageUrl);
              },
              (err) => {
                console.log('Error::::', JSON.stringify(err.error.noprofile));
              }
            );
        },

        (err) => {
          this.toastr.error(err.error.img, 'Error!!');
        }
      );
  }
}
