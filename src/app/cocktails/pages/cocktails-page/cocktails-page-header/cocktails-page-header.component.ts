import {Component, output} from '@angular/core';
import {SearchInputComponent} from '../../../../shared/components/search-input/search-input.component';
import {Button} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';

@Component({
  selector: 'app-cocktails-page-header',
  standalone: true,
  imports: [
    SearchInputComponent,
    ToolbarModule,
    Button
  ],
  templateUrl: './cocktails-page-header.component.html',
  styleUrl: './cocktails-page-header.component.scss'
})
export class CocktailsPageHeaderComponent {
  readonly randomSearchBtnClick = output<void>();
  readonly searchBtnClick = output<string>();

  onSearchBtnClick(query: string): void {
    this.searchBtnClick.emit(query);
  }

  onRandomSearchBtnClick(): void {
    this.randomSearchBtnClick.emit();
  }
}
