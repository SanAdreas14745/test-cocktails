import {patchState, signalStore, type, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {addEntities, addEntity, entityConfig, withEntities} from '@ngrx/signals/entities';
import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {HttpErrorResponse} from '@angular/common/http';
import {Cocktail} from '../interfaces/cocktail.interface';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {catchError, EMPTY, filter, pipe, switchMap, tap} from 'rxjs';
import {computed, effect, inject, untracked} from '@angular/core';
import {ApiCocktailsService} from '../services/api-cocktails.service';

interface CocktailsState {
  query: string;
  randomCocktail: Cocktail | null;
  status: LoadingStatus,
  error: HttpErrorResponse | null
}

const initialState = {
  query: '',
  randomCocktail: null,
  status: LoadingStatus.INIT,
  error: null
}

const cocktailsEntityConfig = entityConfig({
  entity: type<Cocktail>(),
  selectId: (cocktail) => cocktail.idDrink,
});

export const CocktailsStore = signalStore(
  {providedIn: "root"},
  withState<CocktailsState>(initialState),
  withEntities(cocktailsEntityConfig),
  withComputed(({entities, query}) => ({
    filteredCocktailsByQuery: computed(() => entities().filter((c) => c.strDrink.includes(query()))),
    cocktails: computed(() => entities()),
  })),
  withMethods((store) => ({
    setQuery(query: string) {
      patchState(store, {query})
    }
  })),
  withMethods((store, apiCocktailsService = inject(ApiCocktailsService)) => ({
    getRandomCocktail: rxMethod<void>(
      pipe(
        tap(() => patchState(store, {randomCocktail: null})),
        switchMap(() => apiCocktailsService.getRandomCocktail().pipe(
          catchError((error) => {
            console.error(error);
            patchState(store, {status: LoadingStatus.ERROR, error})

            return EMPTY;
          })
        )),
        tap(([randomCocktail]) => {
            patchState(store, {status: LoadingStatus.LOADED, randomCocktail})
          }
        )
      )
    ),
    loadCocktailById: rxMethod<string>(
      pipe(
        tap(() => patchState(store, {status: LoadingStatus.LOADING})),
        switchMap((id) => apiCocktailsService.getCocktailByIdWithCache(id).pipe(
          catchError((error) => {
            console.error(error);
            patchState(store, {status: LoadingStatus.ERROR, error})

            return EMPTY;
          })
        )),
        tap((cocktail) => {
            patchState(store, {status: LoadingStatus.LOADED}, addEntity(cocktail, cocktailsEntityConfig))
          }
        )
      )
    ),
    loadCocktailsByFirstChar: rxMethod<string>(
      pipe(
        tap(() => patchState(store, {status: LoadingStatus.LOADING})),
        filter((query) => query.length === 1),
        switchMap((query) => apiCocktailsService.getCocktailsByCharWithCache(query).pipe(
          catchError((error) => {
            console.error(error);
            patchState(store, {status: LoadingStatus.ERROR, error})

            return EMPTY;
          })
        )),
        tap((cocktails) => {
            patchState(
              store,
              {status: LoadingStatus.LOADED},
              addEntities(cocktails, cocktailsEntityConfig)
            )
          }
        )
      )
    ),
    loadCocktailsByQuery: rxMethod<string>(
      pipe(
        tap(() => patchState(store, {status: LoadingStatus.LOADING})),
        switchMap((query) => apiCocktailsService.getCocktailsByQueryWithCache(query).pipe(
          catchError((error) => {
            console.error(error);
            patchState(store, {status: LoadingStatus.ERROR, error})

            return EMPTY;
          })
        )),
        tap((cocktails) => {
            patchState(
              store,
              {status: LoadingStatus.LOADED},
              addEntities(cocktails, cocktailsEntityConfig)
            )
          }
        )
      )
    )
  })),
  withHooks({
    onInit(store) {
      store.loadCocktailsByFirstChar('a')

      effect(() => {
        const query = store.query();

        untracked(() => {
          if (query) {
            store.loadCocktailsByQuery(query);
          }
        });
      });
    },
  })
)
