import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrdersPanelComponent } from './user-orders-panel.component';

describe('UserOrdersPanelComponent', () => {
  let component: UserOrdersPanelComponent;
  let fixture: ComponentFixture<UserOrdersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrdersPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrdersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
