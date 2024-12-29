import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSidebarFilterComponent } from './product-sidebar-filter.component';

describe('ProductSidebarFilterComponent', () => {
  let component: ProductSidebarFilterComponent;
  let fixture: ComponentFixture<ProductSidebarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSidebarFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSidebarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
