import { TestBed } from '@angular/core/testing';

import { WelcomeGuardGuard } from './welcome-guard.guard';

describe('WelcomeGuardGuard', () => {
  let guard: WelcomeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WelcomeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
