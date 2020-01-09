import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariousInfoComponent } from './variousinfo.component';

describe('VariousInfoComponent', () => {
  let component: VariousInfoComponent;
  let fixture: ComponentFixture<VariousInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariousInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariousInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
