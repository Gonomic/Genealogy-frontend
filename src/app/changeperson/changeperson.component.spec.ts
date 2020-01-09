import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePersonComponent } from './changeperson.component';

describe('ChangePersonComponent', () => {
  let component: ChangePersonComponent;
  let fixture: ComponentFixture<ChangePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
