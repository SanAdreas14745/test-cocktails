import {Route} from '@angular/router';
import {MainPath} from '../enums/main-path.enum';

export const layoutRoutes: Route[] = [
  {
    path: '',
    redirectTo: MainPath.COCKTAILS,
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout.component').then(
        (c) => c.LayoutComponent
      ),
    children: [
      {
        path: MainPath.COCKTAILS,
        loadChildren: () =>
          import('../../cocktails/cocktails.routes').then(
            (c) => c.cocktailsRoutes
          ),
      }
    ]
  },
]
