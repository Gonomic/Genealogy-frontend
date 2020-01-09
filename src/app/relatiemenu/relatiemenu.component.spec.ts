import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatieMenuComponent } from './relatiemenu.component';

describe('RelatieMenuComponent', () => {
  let component: RelatieMenuComponent;
  let fixture: ComponentFixture<RelatieMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatieMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatieMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
