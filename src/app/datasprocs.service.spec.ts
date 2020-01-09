import { TestBed } from '@angular/core/testing';

import { DatasprocsService } from './datasprocs.service';

describe('DatasprocsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatasprocsService = TestBed.get(DatasprocsService);
    expect(service).toBeTruthy();
  });
});
