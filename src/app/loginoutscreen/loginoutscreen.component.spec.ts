import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInOutScreenComponent } from './loginoutscreen.component';

describe('InfoScreenComponent', () => {
  let component: LogInOutScreenComponent;
  let fixture: ComponentFixture<LogInOutScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInOutScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInOutScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
