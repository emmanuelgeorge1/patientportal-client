import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth-guard.guard';

xdescribe('AuthGuardGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  xit('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
