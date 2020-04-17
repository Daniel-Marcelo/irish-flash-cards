import { TestBed } from '@angular/core/testing';

import { ReviewProcessorService } from './review-processor.service';

describe('ReviewProcessorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewProcessorService = TestBed.get(ReviewProcessorService);
    expect(service).toBeTruthy();
  });
});
