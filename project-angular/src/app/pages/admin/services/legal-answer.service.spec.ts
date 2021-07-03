import { TestBed } from '@angular/core/testing';

import { LegalAnswerService } from './legal-answer.service';

describe('LegalAnswerService', () => {
  let service: LegalAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LegalAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
