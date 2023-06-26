import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverDocDataInputPage } from './driver-doc-data-input.page';

describe('DriverDocDataInputPage', () => {
  let component: DriverDocDataInputPage;
  let fixture: ComponentFixture<DriverDocDataInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverDocDataInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverDocDataInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
