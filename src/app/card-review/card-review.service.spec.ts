import { TestBed } from '@angular/core/testing';

import { CardReviewService } from './card-review.service';

describe('CardReviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardReviewService = TestBed.get(CardReviewService);
    expect(service).toBeTruthy();
  });
});
