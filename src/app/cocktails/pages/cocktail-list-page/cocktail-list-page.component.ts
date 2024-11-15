import {Component, computed, inject} from '@angular/core';
import {Cocktail} from '../../interfaces/cocktail.interface';
import {LoaderDirective} from '../../../shared/directives/loader.directive';
import {LoadingStatus} from '../../../shared/enums/loading-status.enum';
import {CocktailsStore} from '../../store/cocktails.store';
import {Router} from '@angular/router';
import {MainPath} from '../../../core/enums/main-path.enum';
import {CocktailCardComponent} from '../../components/cocktail-card/cocktail-card.component';
import {CocktailPath} from '../../enums/cocktail-path.enum';

@Component({
  standalone: true,
  imports: [CocktailCardComponent, LoaderDirective],
  templateUrl: './cocktail-list-page.component.html',
  styleUrl: './cocktail-list-page.component.scss'
})
export class CocktailListPageComponent {
  private readonly cocktailsStore = inject(CocktailsStore);

  readonly cocktails = this.cocktailsStore.filteredCocktailsByQuery;
  readonly cocktailsLoading = computed(() => this.cocktailsStore.status() === LoadingStatus.LOADING);

  private readonly router = inject(Router);

  onCocktailCardClick(id: Cocktail['idDrink']): void {
    this.router.navigate([`${MainPath.COCKTAILS}/${CocktailPath.LIST}/${id}`]);
  }
}
