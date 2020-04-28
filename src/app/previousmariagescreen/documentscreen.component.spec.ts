import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentScreenComponent } from './documentscreen.component';

describe('DocumentScreenComponent', () => {
  let component: DocumentScreenComponent;
  let fixture: ComponentFixture<DocumentScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
