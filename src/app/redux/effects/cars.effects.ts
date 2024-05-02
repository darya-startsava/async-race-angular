import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';

import { GarageService } from '../../garage.service';
import { CarResponse } from '../../garage/models/cars.models';
import {
  carsListLoading,
  carsListSuccess,
  createCar,
  deleteCar,
  generateCars,
  updateCar,
  userErrorGaragePage
} from '../actions/cars.actions';
import { deleteWinner } from '../actions/winners.actions';
import { selectPaginationFeatureGarageCurrentPage } from '../selectors/pagination.selectors';

@Injectable()
export class CarsEffects {
  carsListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carsListLoading),
      mergeMap((action) => {
        return this.garageService.getCars(action.page).pipe(
          map((response: HttpResponse<CarResponse[]>) => {
            const carCount = response.headers.get('X-Total-Count');
            const data: CarResponse[] = response.body;
            return carsListSuccess({ data, carCount });
          }),
          catchError((error) =>
            of(
              userErrorGaragePage({
                error: { status: error.status, statusText: error.statusText }
              })
            )
          )
        );
      })
    );
  });

  deleteCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCar),
      mergeMap((action) =>
        this.garageService.deleteCar(action.id).pipe(
          map(() => deleteWinner({ id: action.id })),
          catchError((error) =>
            of(
              userErrorGaragePage({
                error: { status: error.status, statusText: error.statusText }
              })
            )
          )
        )
      )
    );
  });

  createCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCar),
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureGarageCurrentPage)
      ),
      mergeMap(([action, page]) =>
        this.garageService
          .createCar({ name: action.name, color: action.color })
          .pipe(
            map(() => carsListLoading({ page })),
            catchError((error) =>
              of(
                userErrorGaragePage({
                  error: { status: error.status, statusText: error.statusText }
                })
              )
            )
          )
      )
    );
  });

  updateCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateCar),
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureGarageCurrentPage)
      ),
      mergeMap(([action, page]) =>
        this.garageService
          .updateCar({ name: action.name, color: action.color }, action.id)
          .pipe(
            map(() => carsListLoading({ page })),
            catchError((error) =>
              of(
                userErrorGaragePage({
                  error: { status: error.status, statusText: error.statusText }
                })
              )
            )
          )
      )
    );
  });

  generateCars$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(generateCars),
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureGarageCurrentPage)
      ),
      mergeMap(([_, page]) =>
        this.garageService.generateCars().pipe(
          map(() => carsListLoading({ page })),
          catchError((error) =>
            of(
              userErrorGaragePage({
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
    private garageService: GarageService,
    private store: Store
  ) {}
}
