import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypaymentPage } from './mypayment.page';

describe('MypaymentPage', () => {
  let component: MypaymentPage;
  let fixture: ComponentFixture<MypaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypaymentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
