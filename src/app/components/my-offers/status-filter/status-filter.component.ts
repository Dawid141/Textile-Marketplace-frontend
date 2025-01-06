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

  @Output() showStatus = new EventEmitter<string[]>();
  statuses = ['ACCEPTED', 'REJECTED', 'NEGOTIATION', 'PENDING'];
  selectedStatuses: { [key: string]: boolean } = {};
  displayedColumns: string[] = ['status'];

  ngOnInit(): void {
    this.statuses.forEach(status => {
      this.selectedStatuses[status] = false;
    });
  }

  onStatusChange(): void {
    const selected = Object.keys(this.selectedStatuses).filter(status => this.selectedStatuses[status]);
    this.showStatus.emit(selected);
  }
}
