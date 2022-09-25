import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDebuggerComponent } from './form-debugger.component';

describe('FormDebuggerComponent', () => {
  let component: FormDebuggerComponent;
  let fixture: ComponentFixture<FormDebuggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDebuggerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDebuggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
