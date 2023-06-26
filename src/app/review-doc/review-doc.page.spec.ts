import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReviewDocPage } from './review-doc.page';

describe('ReviewDocPage', () => {
  let component: ReviewDocPage;
  let fixture: ComponentFixture<ReviewDocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewDocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
