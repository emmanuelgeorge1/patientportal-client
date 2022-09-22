import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private http: HttpClient;
  constructor(handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  uploadProfilePicture(user_id: any, profilePicture: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', profilePicture);
    return this.http.post(
      environment.target + '/api/profile/uploadImg/' + user_id,
      formData
    );
  }
}
