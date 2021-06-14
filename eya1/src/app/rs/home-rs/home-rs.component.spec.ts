import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRsComponent } from './home-rs.component';

describe('HomeRsComponent', () => {
  let component: HomeRsComponent;
  let fixture: ComponentFixture<HomeRsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
