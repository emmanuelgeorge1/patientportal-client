import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogBoxComponent } from 'src/app/core/component/confirm-dialog-box/confirm-dialog-box.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog(msg) {
    return this.dialog.open(ConfirmDialogBoxComponent, {
      width: '390px',
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }
}
