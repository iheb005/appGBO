import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureRsComponent } from './facture-rs.component';

describe('FactureRsComponent', () => {
  let component: FactureRsComponent;
  let fixture: ComponentFixture<FactureRsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureRsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
