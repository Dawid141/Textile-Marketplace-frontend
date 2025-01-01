import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOfferComponent } from './single-offer.component';

describe('MainPageComponent', () => {
  let component: SingleOfferComponent;
  let fixture: ComponentFixture<SingleOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
