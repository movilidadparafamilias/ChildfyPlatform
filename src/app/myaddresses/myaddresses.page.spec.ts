import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyaddressesPage } from './myaddresses.page';

describe('MyaddressesPage', () => {
  let component: MyaddressesPage;
  let fixture: ComponentFixture<MyaddressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyaddressesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyaddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
