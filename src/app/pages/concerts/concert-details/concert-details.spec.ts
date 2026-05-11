import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertDetails } from './concert-details';

describe('ConcertDetails', () => {
  let component: ConcertDetails;
  let fixture: ComponentFixture<ConcertDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcertDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcertDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
