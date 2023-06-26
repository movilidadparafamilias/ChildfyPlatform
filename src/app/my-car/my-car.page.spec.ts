import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCarPage } from './my-car.page';

describe('MyCarPage', () => {
  let component: MyCarPage;
  let fixture: ComponentFixture<MyCarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
