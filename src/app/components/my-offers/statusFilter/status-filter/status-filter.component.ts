import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-status-filter',
  imports: [
    MatExpansionPanelTitle,
    MatListOption,
    MatSelectionList,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    NgForOf,
    NgIf,
    MatCheckbox,
    FormsModule,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatColumnDef
  ],
  templateUrl: './status-filter.component.html',
  standalone: true,
  styleUrl: './status-filter.component.css'
})
export class StatusFilterComponent implements OnInit {

  @Output() showCategory = new EventEmitter<string[]>();
  categories = ['ACCEPTED', 'REJECTED','NEGOTIATION','PENDING'];
  selectedCategories: { [key: string]: boolean } = {};
  displayedColumns: string[] = ['category'];

  ngOnInit(): void {
    // Initialize selected categories object with false values
    this.categories.forEach(category => {
      this.selectedCategories[category] = false;
    });
  }

  onCategoryChange(): void {
    // Emit selected categories as an array of strings
    const selected = Object.keys(this.selectedCategories).filter(category => this.selectedCategories[category]);
    this.showCategory.emit(selected);
  }
}
