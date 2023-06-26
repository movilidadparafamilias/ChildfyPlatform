import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassResetSavePage } from './pass-reset-save.page';

describe('PassResetSavePage', () => {
  let component: PassResetSavePage;
  let fixture: ComponentFixture<PassResetSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassResetSavePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassResetSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
