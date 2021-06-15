import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsAnnexeComponent } from './rs-annexe.component';

describe('RsAnnexeComponent', () => {
  let component: RsAnnexeComponent;
  let fixture: ComponentFixture<RsAnnexeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RsAnnexeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsAnnexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
