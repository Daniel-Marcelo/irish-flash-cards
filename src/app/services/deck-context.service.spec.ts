import { TestBed } from '@angular/core/testing';

import { DeckContextService } from './deck-context.service';

describe('DeckContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeckContextService = TestBed.get(DeckContextService);
    expect(service).toBeTruthy();
  });
});
