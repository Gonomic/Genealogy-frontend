import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRelationComponent } from './changerelation.component';

describe('ChangeRelationComponent', () => {
  let component: ChangeRelationComponent;
  let fixture: ComponentFixture<ChangeRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
