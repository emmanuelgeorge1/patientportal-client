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
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  loginFlag: boolean = localStorage.getItem('token') != null;
  physicianDetails: any = {};
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
    this.physicianDetails = JSON.parse(
      localStorage.getItem('physicianDetails')
    );
    this.profileService.getProfilePic(this.physicianDetails.user_id).subscribe(
      (res) => {
        this.imageUrl = res;
        console.log(this.imageUrl);
      },
      (err) => {
        console.log('Error::::', JSON.stringify(err.error.noprofile));
      }
    );
  }

  // loginDocName(name: string) {
  //   name = this.physicianDetails.name;
  //   this.DocName.emit(name);
  // }
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
    debugger;
    this.router.navigateByUrl(path);
  }
  uploadPicture(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.imageUploadService
      .uploadProfilePicture(this.physicianDetails.user_id, file)
      .subscribe(
        (res) => {
          this.toastr.success('success!!');
          this.profileService
            .getProfilePic(this.physicianDetails.user_id)
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
