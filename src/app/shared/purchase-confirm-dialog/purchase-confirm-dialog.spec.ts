import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseConfirmDialog } from './purchase-confirm-dialog';

describe('PurchaseConfirmDialog', () => {
  let component: PurchaseConfirmDialog;
  let fixture: ComponentFixture<PurchaseConfirmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseConfirmDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseConfirmDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
