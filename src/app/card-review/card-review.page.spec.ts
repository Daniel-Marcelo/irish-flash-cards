import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardReviewPage } from './card-review.page';

describe('CardReviewPage', () => {
  let component: CardReviewPage;
  let fixture: ComponentFixture<CardReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
