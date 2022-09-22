import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterAdminComponent } from 'src/app/user/component/auth/register-admin/register-admin.component';
import { RegisterPhysicianComponent } from 'src/app/user/component/auth/register-physician/register-physician.component';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  loginFlag: boolean = localStorage.getItem('token') != null;
  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {}
  physicianRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '90%';
    this.dialog.open(RegisterPhysicianComponent, dialogConfig);
  }
  adminRegister() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '90%';
    this.dialog.open(RegisterAdminComponent, dialogConfig);
  }
}
