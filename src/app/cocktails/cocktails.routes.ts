import {Route} from '@angular/router';
import {PanelContentStore} from '../shared/components/panel-content/panel-content.store';
import {CocktailPath} from './enums/cocktail-path.enum';

export const cocktailsRoutes: Route[] = [
  {
    path: '',
    redirectTo: CocktailPath.LIST,
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/cocktails-page/cocktails-page.component').then(
        (c) => c.CocktailsPageComponent
      ),
    children: [
      {
        path: CocktailPath.LIST,
        loadComponent: () =>
          import('./pages/cocktail-list-page/cocktail-list-page.component').then(
            (c) => c.CocktailListPageComponent
          ),
        providers: [PanelContentStore]
      },
      {
        path: `${CocktailPath.LIST}/:id`,
        loadComponent: () =>
          import('./pages/cocktail-page/cocktail-page.component').then(
            (c) => c.CocktailPageComponent
          )
      }
    ]
  },
]
