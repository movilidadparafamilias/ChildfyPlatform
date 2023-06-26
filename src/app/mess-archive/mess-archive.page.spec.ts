import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessArchivePage } from './mess-archive.page';

describe('MessArchivePage', () => {
  let component: MessArchivePage;
  let fixture: ComponentFixture<MessArchivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessArchivePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessArchivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
