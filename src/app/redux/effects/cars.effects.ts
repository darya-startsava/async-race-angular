import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';

import { GarageService } from '../../garage.service';
import { CarResponse } from '../../garage/models/cars.models';
import { carsListLoading, carsListSuccess } from '../actions/cars.actions';

@Injectable()
export class CarsEffects {
  carsListLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carsListLoading),
      exhaustMap(() =>
        this.garageService
          .getCars()
          .pipe(map((data: CarResponse[]) => carsListSuccess({ data })))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private garageService: GarageService
  ) {}
}
