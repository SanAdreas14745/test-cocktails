import {Routes} from '@angular/router';
import {MainPath} from './core/enums/main-path.enum';

export const routes: Routes = [
  {
    path: MainPath.ROOT,
    loadChildren: () =>
      import('./core/layout/layout.routes').then(
        (c) => c.layoutRoutes
      ),
  },
  {
    path: '**',
    redirectTo: MainPath.ROOT,
  },
];
