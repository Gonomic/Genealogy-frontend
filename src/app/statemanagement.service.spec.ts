import { TestBed } from '@angular/core/testing';

import { StateManagementService } from './statemanagement.service';

describe('StateManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateManagementService = TestBed.get(StateManagementService);
    expect(service).toBeTruthy();
  });
});