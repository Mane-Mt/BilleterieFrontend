import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Artiste } from './artiste';

describe('Artiste', () => {
  let component: Artiste;
  let fixture: ComponentFixture<Artiste>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Artiste],
    }).compileComponents();

    fixture = TestBed.createComponent(Artiste);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
