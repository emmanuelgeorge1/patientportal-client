import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';

xdescribe('TokenInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TokenInterceptor],
    })
  );

  xit('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
