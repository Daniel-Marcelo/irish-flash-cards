import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateCardPage } from './create-card.page';

describe('CreateCardPage', () => {
  let component: CreateCardPage;
  let fixture: ComponentFixture<CreateCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
