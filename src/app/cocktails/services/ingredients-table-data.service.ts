import {Injectable} from '@angular/core';
import {COCKTAILS_CONFIG} from '../configs/cocktails.config';
import {Cocktail} from '../interfaces/cocktail.interface';

@Injectable({providedIn: 'root'})
export class IngredientsTableDataService {
  // todo injection token:
  private readonly countIngredients = COCKTAILS_CONFIG.ingredients.count;
  readonly tableIngredientIndexes = Array.from(
    {length: this.countIngredients},
    (_, i) => i + 1
  );

  getTableDataRows(cocktail: Cocktail): string[][] {
    return this.getRows(cocktail, ['strIngredient', 'strMeasure']);
  }

  private getRows(cocktail: Cocktail, ingredientKeys: string[]): string[][] {
    return cocktail
      ? this.tableIngredientIndexes
        .map((i) => ingredientKeys.map((key) => cocktail[key + i]).filter(Boolean))
        .filter((v): v is string[] => Boolean(v.length))
      : [];
  }
}
