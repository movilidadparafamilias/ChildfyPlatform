import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripRequestPage } from './trip-request.page';

describe('TripRequestPage', () => {
  let component: TripRequestPage;
  let fixture: ComponentFixture<TripRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
