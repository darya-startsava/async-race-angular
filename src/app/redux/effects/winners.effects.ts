import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, filter, forkJoin, map, mergeMap, of } from 'rxjs';

import { GarageService } from '../../garage.service';
import { CarResponse } from '../../garage/models/cars.models';
import { WinnersService } from '../../winners.service';
import { Winner } from '../../winners/models/winners.models';
import { carsListLoading } from '../actions/cars.actions';
import { checkRaceIsFinished } from '../actions/race.actions';
import {
  createWinnerFailed,
  createWinnerLoading,
  createWinnerSuccess,
  deleteWinner,
  deleteWinnerFailed,
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
import { selectPaginationFeatureGarageCurrentPage } from '../selectors/pagination.selectors';

@Injectable()
export class WinnersEffects {
  winnersListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(winnersListLoading),
      mergeMap((action) => {
        return forkJoin({
          winnersRequest$: this.winnersService.getWinners(action.page),
          allCarsRequest$: this.garageService.getAllCars()
        }).pipe(
          map(
            (response: {
              winnersRequest$: HttpResponse<Winner[]>;
              allCarsRequest$: CarResponse[];
            }) => {
              const winnersCount =
                response.winnersRequest$.headers.get('X-Total-Count');
              const data: Winner[] = response.winnersRequest$.body;
              const allCarsData = response.allCarsRequest$;
              console.log(
                'data:',
                data,
                'winnersCount:',
                winnersCount,
                'allCarsData',
                allCarsData
              );
              return winnersListSuccess({ data, winnersCount, allCarsData });
            }
          ),
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

  deleteWinner$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteWinner),
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureGarageCurrentPage)
      ),
      mergeMap(([action, page]) =>
        this.winnersService.deleteWinner(action.id).pipe(
          map(() => carsListLoading({ page: page.toString() })),
          catchError((error) =>
            of(error).pipe(
              filter(() => error.status !== 404),
              map(() => deleteWinnerFailed({ error }))
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private winnersService: WinnersService,
    private garageService: GarageService,
    private store: Store
  ) {}
}
