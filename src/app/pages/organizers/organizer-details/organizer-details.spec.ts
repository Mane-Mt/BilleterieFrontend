import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerDetails } from './organizer-details';

describe('OrganizerDetails', () => {
  let component: OrganizerDetails;
  let fixture: ComponentFixture<OrganizerDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizerDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
