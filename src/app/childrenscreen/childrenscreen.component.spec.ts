import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenScreenComponent } from './childrenscreen.component';

describe('ChildrenScreenComponent', () => {
  let component: ChildrenScreenComponent;
  let fixture: ComponentFixture<ChildrenScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
