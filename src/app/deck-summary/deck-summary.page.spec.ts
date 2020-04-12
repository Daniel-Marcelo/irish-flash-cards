import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeckSummaryPage } from './deck-summary.page';

describe('DeckSummaryPage', () => {
  let component: DeckSummaryPage;
  let fixture: ComponentFixture<DeckSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeckSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeckSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
