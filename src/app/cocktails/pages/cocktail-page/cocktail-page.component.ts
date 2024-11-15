import {Component, computed, effect, inject, untracked} from '@angular/core';
import {MessageService} from 'primeng/api';
import {PanelContentStore} from '../../../shared/components/panel-content/panel-content.store';
import {ActivatedRoute, Router} from '@angular/router';
import {CocktailsStore} from '../../store/cocktails.store';
import {LoadingStatus} from '../../../shared/enums/loading-status.enum';
import {filter, map} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {LoaderDirective} from '../../../shared/directives/loader.directive';
import {PanelModule} from 'primeng/panel';
import {CocktailItemComponent} from '../../components/cocktail-item/cocktail-item.component';
import {Cocktail} from '../../interfaces/cocktail.interface';
import {Button} from 'primeng/button';
import {MainPath} from '../../../core/enums/main-path.enum';
import {CocktailPageHeaderComponent} from './cocktail-page-header/cocktail-page-header.component';
import {CocktailPath} from '../../enums/cocktail-path.enum';

@Component({
  standalone: true,
  imports: [
    CocktailPageHeaderComponent,
    CocktailItemComponent,
    LoaderDirective,
    PanelModule,
    Button
  ],
  providers: [MessageService, PanelContentStore],
  templateUrl: './cocktail-page.component.html',
  styleUrl: './cocktail-page.component.scss'
})
export class CocktailPageComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cocktailsStore = inject(CocktailsStore);

  readonly cocktailLoading = computed(() => this.cocktailsStore.status() === LoadingStatus.LOADING);
  readonly cocktail = computed(() =>
    this.cocktailsStore.cocktails().find((c) => c.idDrink === this.pageId())
  );
  readonly currentCocktailId = computed(() =>
    this.cocktail()
      ? this.cocktailsStore.cocktails().indexOf(this.cocktail()!)
      : 0
  )
  private readonly pageId$ = this.activatedRoute.paramMap.pipe(
    map((paramMap) => paramMap.get('id')),
    filter(Boolean),
  );
  readonly pageId = toSignal(this.pageId$)

  constructor() {
    effect(() => {
      const pageId = this.pageId();

      untracked(() => {
        if (pageId) {
          this.cocktailsStore.loadCocktailById(pageId)
        }
      })
    });
  }

  navigateBtnClick(type: 'previous' | 'next'): void {
    const currentCocktailId = this.currentCocktailId();
    const index = type === 'next' ? currentCocktailId + 1 : currentCocktailId - 1;
    const cocktail = this.getCocktail(index);

    this.navigateToCocktail(cocktail.idDrink);
  }

  private navigateToCocktail(id: string): void {
    this.router.navigate([`${MainPath.COCKTAILS}/${CocktailPath.LIST}/${id}`])
  }

  private getCocktail(i: number): Cocktail {
    return this.cocktailsStore.cocktails().at(i) ?? this.cocktail()!;
  }
}

