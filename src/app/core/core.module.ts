import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './component/layout/footer/footer.component';
import { HeaderComponent } from './component/layout/header/header.component';
import { LandingComponent } from './component/layout/landing/landing.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogBoxComponent } from './component/confirm-dialog-box/confirm-dialog-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LandingComponent,
    ConfirmDialogBoxComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [],
})
export class CoreModule {}
