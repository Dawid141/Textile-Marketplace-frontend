import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationDialogWindowComponent } from './negotiation-dialog-window.component';

describe('NegotiationDialogWindowComponent', () => {
  let component: NegotiationDialogWindowComponent;
  let fixture: ComponentFixture<NegotiationDialogWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NegotiationDialogWindowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NegotiationDialogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
