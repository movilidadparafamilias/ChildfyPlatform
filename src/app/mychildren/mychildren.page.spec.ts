import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MychildrenPage } from './mychildren.page';

describe('MychildrenPage', () => {
  let component: MychildrenPage;
  let fixture: ComponentFixture<MychildrenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MychildrenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MychildrenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
