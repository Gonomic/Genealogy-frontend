import { TestBed } from '@angular/core/testing';

import { EventbridgeService } from './eventbridge.service';

describe('EventbridgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventbridgeService = TestBed.get(EventbridgeService);
    expect(service).toBeTruthy();
  });
});
