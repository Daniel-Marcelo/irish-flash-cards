import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateDeckPage } from './create-deck.page';

describe('CreateDeckPage', () => {
  let component: CreateDeckPage;
  let fixture: ComponentFixture<CreateDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
