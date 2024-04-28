import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of } from 'rxjs';

import { WinnersService } from '../../winners.service';
import { Winner } from '../../winners/models/winners.models';
import { checkRaceIsFinished } from '../actions/race.actions';
import {
  createWinnerFailed,
  createWinnerLoading,
  createWinnerSuccess,
  getWinnerFailed,
  getWinnerLoading,
  updateWinnerFailed,
  updateWinnerLoading,
  updateWinnerSuccess,
  winnersListFailed,
  winnersListLoading,
  winnersListSuccess
} from '../actions/winners.actions';
import {
  selectCarsFeatureWinnerId,
  selectCarsFeatureWinnerTime
} from '../selectors/cars.selectors';

@Injectable()
export class WinnersEffects {
  winnersListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(winnersListLoading),
      mergeMap((action) => {
        return this.winnersService.getWinners(action.page).pipe(
          map((response: HttpResponse<Winner[]>) => {
            const winnersCount = response.headers.get('X-Total-Count');
            const data: Winner[] = response.body;
            console.log('data:', data, 'winnersCount:', winnersCount);
            return winnersListSuccess({ data, winnersCount });
          }),
          catchError((error) => of(winnersListFailed({ error })))
        );
      })
    );
  });

  checkRaceIsFinished$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(checkRaceIsFinished),
      concatLatestFrom(() => [this.store.select(selectCarsFeatureWinnerId)]),
      filter(([_, winnerId]) => typeof winnerId === 'number'),
      map(([_, winnerId]) => getWinnerLoading({ id: winnerId }))
    );
  });

  getWinnerLoading = createEffect(() => {
    return this.actions$.pipe(
      ofType(getWinnerLoading),
      concatLatestFrom(() => [
        this.store.select(selectCarsFeatureWinnerId),
        this.store.select(selectCarsFeatureWinnerTime)
      ]),
      mergeMap(([action, id, time]) =>
        this.winnersService.getWinner(action.id).pipe(
          map((data: Winner) =>
            updateWinnerLoading({ ...data, wins: data.wins + 1 })
          ),
          catchError((error) => {
            if (error.status === 404) {
              return of(createWinnerLoading({ id, time }));
            }
            return of(
              getWinnerFailed({
                error: { status: error.status, statusText: error.statusText }
              })
            );
          })
        )
      )
    );
  });

  createWinnerLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createWinnerLoading),
      mergeMap((action) =>
        this.winnersService
          .createWinner({
            id: action.id,
            wins: 1,
            time: action.time
          })
          .pipe(
            map((data: Winner) => createWinnerSuccess({ data })),
            catchError((error) =>
              of(
                createWinnerFailed({
                  error: { status: error.status, statusText: error.statusText }
                })
              )
            )
          )
      )
    );
  });

  updateWinnerLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateWinnerLoading),
      mergeMap((action) =>
        this.winnersService
          .updateWinner({
            id: action.id,
            wins: action.wins,
            time: action.time
          })
          .pipe(
            map((data: Winner) => updateWinnerSuccess({ data })),
            catchError((error) =>
              of(
                updateWinnerFailed({
                  error: { status: error.status, statusText: error.statusText }
                })
              )
            )
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private winnersService: WinnersService,
    private store: Store
  ) {}
}
