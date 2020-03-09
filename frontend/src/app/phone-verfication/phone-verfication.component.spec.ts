import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerficationComponent } from './phone-verfication.component';

describe('PhoneVerficationComponent', () => {
  let component: PhoneVerficationComponent;
  let fixture: ComponentFixture<PhoneVerficationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerficationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
