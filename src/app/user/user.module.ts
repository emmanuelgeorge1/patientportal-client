import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { RegisterPatientComponent } from './component/auth/register-patient/register-patient.component';
import { RegisterPhysicianComponent } from './component/auth/register-physician/register-physician.component';
import { RegisterAdminComponent } from './component/auth/register-admin/register-admin.component';
import { LoginPatientComponent } from './component/auth/login-patient/login-patient.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    RegisterPatientComponent,
    RegisterPhysicianComponent,
    RegisterAdminComponent,
    LoginPatientComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    UserRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthService],
  exports: [],
})
export class UserModule {}
