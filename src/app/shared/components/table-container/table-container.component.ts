import {Component, input} from '@angular/core';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [TableModule],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss'
})
export class TableContainerComponent {
  readonly displayedColumns = input.required<string[]>();
  readonly tableData = input.required<string[][]>();
  readonly hasPagination = input(false);
}
