import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error.interceptor';

xdescribe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [ErrorInterceptor],
    })
  );

  xit('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
