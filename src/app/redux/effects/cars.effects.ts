import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {concatLatestFrom} from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

import { GarageService } from '../../garage.service';
import { CarResponse } from '../../garage/models/cars.models';
import {
  carsListFailed,
  carsListLoading,
  carsListSuccess,
  createCar,
  createCarFailed,
  deleteCar,
  deleteCarFailed,
  generateCars,
  generateCarsFailed,
  updateCar,
  updateCarFailed
} from '../actions/cars.actions';
import { selectPaginationFeatureGarageCurrentPage } from '../selectors/pagination.selectors';

@Injectable()
export class CarsEffects {
  carsListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carsListLoading),
      exhaustMap((action) => {
        return this.garageService.getCars(action.page).pipe(
          map((response: HttpResponse<CarResponse[]>) => {
            const carCount = response.headers.get('X-Total-Count');
            const data: CarResponse[] = response.body;
            return carsListSuccess({ data, carCount });
          }),
          catchError((error) => of(carsListFailed({ error })))
        );
      })
    );
  });

  deleteCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCar),
      concatLatestFrom(() =>
        this.store.select(selectPaginationFeatureGarageCurrentPage)
      ),
      mergeMap(([action, page]) =>
        this.garageService.deleteCar(action.id).pipe(
          map(() => carsListLoading({ page: page.toString() })),
          catchError((error) => of(deleteCarFailed({ error })))
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
            map(() => carsListLoading({ page: page.toString() })),
            catchError((error) => of(createCarFailed({ error })))
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
            map(() => carsListLoading({ page: page.toString() })),
            catchError((error) => of(updateCarFailed({ error })))
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
          map(() => carsListLoading({ page: page.toString() })),
          catchError((error) => of(generateCarsFailed({ error })))
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
