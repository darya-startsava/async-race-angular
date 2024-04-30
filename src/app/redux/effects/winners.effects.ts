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
  changeWinnersSort,
  createWinnerFailed,
  createWinnerLoading,
  deleteWinner,
  deleteWinnerFailed,
  getWinnerFailed,
  getWinnerLoading,
  updateWinnerFailed,
  updateWinnerLoading,
  winnersListFailed,
  winnersListLoading,
  winnersListSuccess
} from '../actions/winners.actions';
import {
  selectCarsFeatureWinnerId,
  selectCarsFeatureWinnerTime
} from '../selectors/cars.selectors';
import {
  selectPaginationFeatureGarageCurrentPage,
  selectPaginationFeatureWinnersCurrentPage
} from '../selectors/pagination.selectors';
import {
  selectWinnersFeatureSortBy,
  selectWinnersFeatureSortOrder
} from '../selectors/winners.selectors';

@Injectable()
export class WinnersEffects {
  winnersListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(winnersListLoading),
      concatLatestFrom(() => [
        this.store.select(selectWinnersFeatureSortBy),
        this.store.select(selectWinnersFeatureSortOrder)
      ]),
      mergeMap(([action, sortBy, sortOrder]) => {
        return forkJoin({
          winnersRequest$: this.winnersService.getWinners(
            action.page,
            sortBy,
            sortOrder
          ),
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
      concatLatestFrom(() => this.store.select(selectCarsFeatureWinnerId)),
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
          map((data: Winner) => {
            return updateWinnerLoading({
              ...data,
              wins: data.wins + 1,
              time: Math.min(time, data.time)
            });
          }),
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
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureWinnersCurrentPage)
      ),
      mergeMap(([action, page]) =>
        this.winnersService
          .createWinner({
            id: action.id,
            wins: 1,
            time: action.time
          })
          .pipe(
            map(() => winnersListLoading({ page })),
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
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureWinnersCurrentPage)
      ),
      mergeMap(([action, page]) =>
        this.winnersService
          .updateWinner({
            id: action.id,
            wins: action.wins,
            time: action.time
          })
          .pipe(
            map(() => winnersListLoading({ page })),
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
          map(() => carsListLoading({ page })),
          catchError((error) =>
            of(error).pipe(
              map(() => {
                if (error.status === 404) {
                  return carsListLoading({ page });
                }
                return deleteWinnerFailed({ error });
              })
            )
          )
        )
      )
    );
  });

  changeWinnersSort$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeWinnersSort),
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureWinnersCurrentPage)
      ),
      map(([_, page]) => winnersListLoading({ page }))
    );
  });

  constructor(
    private actions$: Actions,
    private winnersService: WinnersService,
    private garageService: GarageService,
    private store: Store
  ) {}
}
