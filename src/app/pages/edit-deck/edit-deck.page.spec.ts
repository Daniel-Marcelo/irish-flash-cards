import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDeckPage } from './edit-deck.page';

describe('EditDeckPage', () => {
  let component: EditDeckPage;
  let fixture: ComponentFixture<EditDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
