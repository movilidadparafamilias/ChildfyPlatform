import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignDocPage } from './sign-doc.page';

describe('SignDocPage', () => {
  let component: SignDocPage;
  let fixture: ComponentFixture<SignDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignDocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
