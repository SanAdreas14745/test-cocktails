import {Component, effect, inject, model, untracked} from '@angular/core';
import {CocktailsPageHeaderComponent} from './cocktails-page-header/cocktails-page-header.component';
import {CocktailsStore} from '../../store/cocktails.store';
import {RouterOutlet} from '@angular/router';
import {PanelContentStore} from '../../../shared/components/panel-content/panel-content.store';
import {CocktailDialogComponent} from '../../components/modals/cocktail-dialog/cocktail-dialog.component';

@Component({
  standalone: true,
  templateUrl: './cocktails-page.component.html',
  imports: [
    CocktailsPageHeaderComponent,
    CocktailDialogComponent,
    RouterOutlet
  ],
  providers: [PanelContentStore],
  styleUrl: './cocktails-page.component.scss'
})
export class CocktailsPageComponent {
  readonly visibleRandomCocktailDialog = model(false);
  private readonly cocktailsStore = inject(CocktailsStore);
  readonly randomCocktail = this.cocktailsStore.randomCocktail;

  constructor() {
    effect(() => {
      const visible = this.visibleRandomCocktailDialog();

      untracked(() => {
        if (visible) {
          this.cocktailsStore.getRandomCocktail();
        }
      })
    });
  }

  showRandomCocktailDialog(): void {
    this.visibleRandomCocktailDialog.set(true);
  }

  onSearchBtnClick(query: string): void {
    this.cocktailsStore.setQuery(query);
  }
}
