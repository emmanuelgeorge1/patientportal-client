import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/shared/service/subject.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {}
  logout() {
    this.subjectService.logout();
  }
}
