import {Component, input, model} from '@angular/core';
import {DialogModule} from 'primeng/dialog';
import {LoaderDirective} from '../../../../shared/directives/loader.directive';
import {CocktailItemComponent} from '../../cocktail-item/cocktail-item.component';
import {Cocktail} from '../../../interfaces/cocktail.interface';

@Component({
  selector: 'app-cocktail-dialog',
  standalone: true,
  imports: [
    CocktailItemComponent,
    LoaderDirective,
    DialogModule
  ],
  templateUrl: './cocktail-dialog.component.html',
})
export class CocktailDialogComponent {
  readonly cocktail = input.required<Cocktail | null>();
  readonly visible = model(false);
}
