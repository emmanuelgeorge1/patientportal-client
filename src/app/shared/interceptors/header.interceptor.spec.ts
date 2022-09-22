import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './header.interceptor';

describe('HeaderInterceptor', () => {
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeaderInterceptor,
          multi: true,
        },
      ],
    });
  });

  // it('should add an Authorization header', () => {
  //   service.getPosts().subscribe(response => {
  //     expect(response).toBeTruthy();
  //   });

  //   const httpRequest = httpMock.expectOne(`${service.ROOT_URL}/posts`);

  //   expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  // });
});
