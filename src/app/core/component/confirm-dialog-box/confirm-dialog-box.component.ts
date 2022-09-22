import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog-box',
  templateUrl: './confirm-dialog-box.component.html',
  styleUrls: ['./confirm-dialog-box.component.css'],
})
export class ConfirmDialogBoxComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ConfirmDialogBoxComponent>
  ) {}
  ngOnInit(): void {}
  closeDialog() {
    this.dialogRef.close(false);
  }
}
