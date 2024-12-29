import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitPasswordResetComponent } from './submit-password-reset.component';

describe('PasswordResetComponent', () => {
  let component: SubmitPasswordResetComponent;
  let fixture: ComponentFixture<SubmitPasswordResetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitPasswordResetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitPasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
