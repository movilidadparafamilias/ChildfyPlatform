import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodeInputPage } from './code-input.page';

describe('CodeInputPage', () => {
  let component: CodeInputPage;
  let fixture: ComponentFixture<CodeInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
