import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/service/subject.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  loginFlag: boolean = localStorage.getItem('token') != null;

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit(): void {
    this.subjectService.loginSubject.subscribe(
      (res) => {
        this.loginFlag = res;
      },
      (err) => {
        this.loginFlag = false;
      }
    );
  }
}
