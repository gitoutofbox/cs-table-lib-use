import { TestBed } from '@angular/core/testing';

import { CsTableService } from './cs-table.service';

describe('CsTableService', () => {
  let service: CsTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
