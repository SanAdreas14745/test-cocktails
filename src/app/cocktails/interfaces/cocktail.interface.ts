interface Ingredients {
  [key: `strIngredient${number}`]: string | null;

  [key: `strMeasure${number}`]: string | null;
}

export interface Cocktail extends Ingredients {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
  strGlass: string,
  strCategory: string;
  strInstructions: string;

  [key: string]: string | null;
}
