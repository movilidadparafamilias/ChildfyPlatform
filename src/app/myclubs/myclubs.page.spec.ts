import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyclubsPage } from './myclubs.page';

describe('MyclubsPage', () => {
  let component: MyclubsPage;
  let fixture: ComponentFixture<MyclubsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyclubsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyclubsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
