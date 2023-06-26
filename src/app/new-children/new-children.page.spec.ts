import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewChildrenPage } from './new-children.page';

describe('NewChildrenPage', () => {
  let component: NewChildrenPage;
  let fixture: ComponentFixture<NewChildrenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChildrenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewChildrenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
