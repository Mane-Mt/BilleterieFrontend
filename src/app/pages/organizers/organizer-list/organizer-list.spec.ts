import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerList } from './organizer-list';

describe('OrganizerList', () => {
  let component: OrganizerList;
  let fixture: ComponentFixture<OrganizerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizerList],
    }).compileComponents();

    fixture = TestBed.createComponent(OrganizerList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
