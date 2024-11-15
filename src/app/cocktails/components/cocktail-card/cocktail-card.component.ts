import {Component, input} from '@angular/core';
import {Cocktail} from '../../interfaces/cocktail.interface';
import {NgOptimizedImage} from '@angular/common';
import {CardModule} from 'primeng/card';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [NgOptimizedImage, CardModule],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.scss'
})
export class CocktailCardComponent {
  readonly cocktail = input<Cocktail>();
}
