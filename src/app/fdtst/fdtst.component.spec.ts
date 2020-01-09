import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdtstComponent } from './fdtst.component';

describe('FdtstComponent', () => {
  let component: FdtstComponent;
  let fixture: ComponentFixture<FdtstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdtstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdtstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
