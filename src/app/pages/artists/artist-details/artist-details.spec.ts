import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetails } from './artist-details';

describe('ArtistDetails', () => {
  let component: ArtistDetails;
  let fixture: ComponentFixture<ArtistDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtistDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
