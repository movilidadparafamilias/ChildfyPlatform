import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocDataInputPage } from './doc-data-input.page';

describe('DocDataInputPage', () => {
  let component: DocDataInputPage;
  let fixture: ComponentFixture<DocDataInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDataInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocDataInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
