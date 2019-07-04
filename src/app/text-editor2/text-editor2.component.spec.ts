import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditor2Component } from './text-editor2.component';

describe('TextEditor2Component', () => {
  let component: TextEditor2Component;
  let fixture: ComponentFixture<TextEditor2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditor2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditor2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
