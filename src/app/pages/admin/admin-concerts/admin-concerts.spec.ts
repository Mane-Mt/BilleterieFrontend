import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConcerts } from './admin-concerts';

describe('AdminConcerts', () => {
  let component: AdminConcerts;
  let fixture: ComponentFixture<AdminConcerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConcerts],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminConcerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
