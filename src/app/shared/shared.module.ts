import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectService } from './service/subject.service';
import { DialogService } from './service/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatDialogModule, MatIconModule, MatInputModule],
  providers: [SubjectService, DialogService],
  entryComponents: [],
})
export class SharedModule {}
