import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRelationComponent } from './deleterelation.component';

describe('DeleteRelationComponent', () => {
  let component: DeleteRelationComponent;
  let fixture: ComponentFixture<DeleteRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
