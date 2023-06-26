import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SugestClubPage } from './sugest-club.page';

describe('SugestClubPage', () => {
  let component: SugestClubPage;
  let fixture: ComponentFixture<SugestClubPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugestClubPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SugestClubPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
