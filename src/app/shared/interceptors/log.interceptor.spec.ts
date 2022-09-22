import { TestBed } from '@angular/core/testing';

import { LogInterceptor } from './log.interceptor';

xdescribe('LogInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [LogInterceptor],
    })
  );

  xit('should be created', () => {
    const interceptor: LogInterceptor = TestBed.inject(LogInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
