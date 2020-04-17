import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewSummaryPage } from './review-summary.page';

describe('ReviewSummaryPage', () => {
  let component: ReviewSummaryPage;
  let fixture: ComponentFixture<ReviewSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
