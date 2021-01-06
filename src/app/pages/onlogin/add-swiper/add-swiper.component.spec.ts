import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSwiperComponent } from './add-swiper.component';

describe('AddSwiperComponent', () => {
  let component: AddSwiperComponent;
  let fixture: ComponentFixture<AddSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
