import { TestBed } from '@angular/core/testing';

import { NetworkAssetService } from './network-asset.service';

describe('NetworkAssetService', () => {
  let service: NetworkAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
