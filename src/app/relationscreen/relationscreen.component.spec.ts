import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationScreenComponent } from './relationscreen.component';

describe('RelationScreenComponent', () => {
  let component: RelationScreenComponent;
  let fixture: ComponentFixture<RelationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
