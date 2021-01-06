import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnloginComponent } from './onlogin.component';

describe('OnloginComponent', () => {
  let component: OnloginComponent;
  let fixture: ComponentFixture<OnloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
