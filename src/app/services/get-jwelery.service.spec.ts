import { TestBed } from '@angular/core/testing';

import { GetJweleryService } from './get-jwelery.service';

describe('GetJweleryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetJweleryService = TestBed.get(GetJweleryService);
    expect(service).toBeTruthy();
  });
});
