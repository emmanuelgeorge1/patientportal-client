import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { SubjectService } from 'src/app/shared/service/subject.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/dashboard/services/profile.service';
import { ImageUploadService } from 'src/app/dashboard/services/image-upload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  loginFlag: boolean = localStorage.getItem('token') != null;
  patientDetails: any = {};
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
  ngOnInit() {
    this.patientDetails = JSON.parse(localStorage.getItem('patientDetails'));

    this.subjectService.loginSubject.subscribe(
      (res) => {
        this.loginFlag = res;
      },
      (err) => {
        this.loginFlag = false;
      }
    );
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

  ngAfterViewInit() {
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
      .uploadProfilePicture(this.patientDetails.user_id, file)
      .subscribe(
        (res) => {
          this.toastr.success('success!!');
          this.profileService
            .getProfilePic(this.patientDetails.user_id)
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
