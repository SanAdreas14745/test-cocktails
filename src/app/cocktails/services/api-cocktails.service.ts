import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, Observable, of, shareReplay, switchMap, throwError} from 'rxjs';
import {Cocktail} from '../interfaces/cocktail.interface';
import {memoize} from 'lodash-es';

enum ApiErrorMsg {
  NO_DATA_FOUND = 'no data found'
}

type Drinks = Cocktail[] | ApiErrorMsg | null;

interface DrinksApiResponse {
  drinks: Drinks;
}

function cocktailsApiHandler(
  src$: Observable<DrinksApiResponse>
): Observable<Cocktail[]> {
  return src$.pipe(
    map(({drinks}) => drinks),
    cocktailsErrorHandler,
    shareReplay(1)
  )
}

function cocktailsErrorHandler(
  src: Observable<Drinks>
): Observable<Cocktail[]> {
  return src.pipe(
    switchMap((drinks) =>
      !drinks || drinks === ApiErrorMsg.NO_DATA_FOUND
        ? throwError(() => new Error(ApiErrorMsg.NO_DATA_FOUND))
        : of(drinks)
    )
  )
}

@Injectable({providedIn: 'root'})
export class ApiCocktailsService {
  readonly getCocktailsByQueryWithCache = memoize(
    this.getCocktailsByQuery.bind(this)
  );

  readonly getCocktailsByCharWithCache = memoize(
    this.getCocktailsByChar.bind(this)
  );

  readonly getCocktailByIdWithCache = memoize(
    this.getCocktailById.bind(this)
  );

  private readonly http = inject(HttpClient);

  getRandomCocktail(): Observable<Cocktail[]> {
    return this.http.get<DrinksApiResponse>('random.php').pipe(cocktailsApiHandler)
  }

  private getCocktailById(id: string): Observable<Cocktail> {
    const params = new HttpParams().set('i', id);

    return this.http.get<DrinksApiResponse>('lookup.php', {params})
      .pipe(
        cocktailsApiHandler,
        map((c) => c[0])
      )
  }

  private getCocktailsByChar(firstChar: string): Observable<Cocktail[]> {
    const params = new HttpParams().set('f', firstChar);

    return this.searchCocktails(params)
  }

  private getCocktailsByQuery(query: string): Observable<Cocktail[]> {
    let params = new HttpParams();

    if (query) {
      params = params.append('s', query);
    }

    return this.searchCocktails(params)
  }

  private searchCocktails(params: HttpParams): Observable<Cocktail[]> {
    return this.http.get<DrinksApiResponse>('search.php', {params}).pipe(cocktailsApiHandler)
  }
}
