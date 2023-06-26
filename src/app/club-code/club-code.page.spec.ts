import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClubCodePage } from './club-code.page';

describe('ClubCodePage', () => {
  let component: ClubCodePage;
  let fixture: ComponentFixture<ClubCodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubCodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClubCodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
