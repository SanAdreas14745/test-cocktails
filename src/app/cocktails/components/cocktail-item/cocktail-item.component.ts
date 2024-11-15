import {Component, computed, inject, input} from '@angular/core';
import {PanelViewMode} from '../../../shared/components/panel-content/panel-view-mode.enum';
import {TableContainerComponent} from '../../../shared/components/table-container/table-container.component';
import {NgOptimizedImage} from '@angular/common';
import {PanelContentComponent} from '../../../shared/components/panel-content/panel-content.component';
import {Cocktail} from '../../interfaces/cocktail.interface';
import {IngredientsTableDataService} from '../../services/ingredients-table-data.service';
import {PanelContentStore} from '../../../shared/components/panel-content/panel-content.store';

@Component({
  selector: 'app-cocktail-item',
  standalone: true,
  imports: [
    TableContainerComponent,
    PanelContentComponent,
    NgOptimizedImage
  ],
  templateUrl: './cocktail-item.component.html',
  styleUrl: './cocktail-item.component.scss'
})
export class CocktailItemComponent {
  readonly cocktail = input.required<Cocktail>();

  private readonly panelStore = inject(PanelContentStore);
  readonly isOverlayPanel = computed(() =>
    this.panelStore.viewMode() === PanelViewMode.OVERLAY_PANEL
  );

  private readonly ingredientsTableDataService = inject(IngredientsTableDataService);
  readonly ingredientsTableData = computed(() =>
    this.ingredientsTableDataService.getTableDataRows(this.cocktail())
  );
}
