import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  deleteCarFailed
} from '../actions/cars.actions';

@Injectable()
export class CarsEffects {
  carsListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carsListLoading),
      exhaustMap(() =>
        this.garageService.getCars().pipe(
          map((data: CarResponse[]) => carsListSuccess({ data })),
          catchError((error) => of(carsListFailed({ error })))
        )
      )
    );
  });

  deleteCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCar),
      mergeMap((action) =>
        this.garageService.deleteCar(action.id).pipe(
          map(() => carsListLoading()),
          catchError((error) => of(deleteCarFailed({ error })))
        )
      )
    );
  });

  createCar$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCar),
      mergeMap((action) =>
        this.garageService
          .createCar({ name: action.name, color: action.color })
          .pipe(
            map(() => carsListLoading()),
            catchError((error) => of(createCarFailed({ error })))
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private garageService: GarageService
  ) {}
}
