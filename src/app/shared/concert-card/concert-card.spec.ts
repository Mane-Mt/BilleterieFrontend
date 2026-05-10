import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertCard } from './concert-card';

describe('ConcertCard', () => {
  let component: ConcertCard;
  let fixture: ComponentFixture<ConcertCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConcertCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcertCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
