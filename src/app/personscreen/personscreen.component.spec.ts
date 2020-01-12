import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonScreenComponent } from './personscreen.component';

describe('PersoonScreenComponent', () => {
  let component: PersonScreenComponent;
  let fixture: ComponentFixture<PersonScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
