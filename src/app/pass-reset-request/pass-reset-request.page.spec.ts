import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassResetRequestPage } from './pass-reset-request.page';

describe('PassResetRequestPage', () => {
  let component: PassResetRequestPage;
  let fixture: ComponentFixture<PassResetRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassResetRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassResetRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
