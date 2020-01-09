import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoonMenuComponent } from './persoonmenu.component';

describe('PersoonMenuComponent', () => {
  let component: PersoonMenuComponent;
  let fixture: ComponentFixture<PersoonMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersoonMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
