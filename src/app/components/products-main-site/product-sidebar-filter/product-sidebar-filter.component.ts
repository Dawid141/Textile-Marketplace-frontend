import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelTitle,MatExpansionPanelHeader} from '@angular/material/expansion';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-product-sidebar-filter',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatSelectionList,
    MatListOption,
    NgForOf,
    NgIf
  ],
  templateUrl: './product-sidebar-filter.component.html',
  standalone: true,
  styleUrl: './product-sidebar-filter.component.css'
})
export class ProductSidebarFilterComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>;
  categories = ['cotton','linen'];

  ngOnInit(): void {
  }

  ShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
