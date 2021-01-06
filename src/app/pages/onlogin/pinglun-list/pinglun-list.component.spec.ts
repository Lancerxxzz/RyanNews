import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinglunListComponent } from './pinglun-list.component';

describe('PinglunListComponent', () => {
  let component: PinglunListComponent;
  let fixture: ComponentFixture<PinglunListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinglunListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinglunListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
