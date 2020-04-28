import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeviousMariageScreenComponent } from './previousmariagescreen.component';

describe('PreviousMariageScreenComponent', () => {
  let component: PreviousMariageScreenComponent;
  let fixture: ComponentFixture<PreviousMariageScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousMariageScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousMariageScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
