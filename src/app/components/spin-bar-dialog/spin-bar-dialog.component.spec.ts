import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinBarDialogComponent } from './spin-bar-dialog.component';

describe('SpinBarDialogComponent', () => {
  let component: SpinBarDialogComponent;
  let fixture: ComponentFixture<SpinBarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinBarDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpinBarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
