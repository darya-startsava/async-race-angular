import { createAction, props } from '@ngrx/store';

import { CarResponse } from '../../garage/models/cars.models';
import { ErrorState } from '../state.models';

export const carsListLoading = createAction('[Garage] Cars list loading');

export const carsListSuccess = createAction(
  '[Garage] Cars list  success',
  props<{ data: CarResponse[] }>()
);

export const carsListFailed = createAction(
  '[Garage] Cars list Failed',
  props<{ error: ErrorState }>()
);

export const deleteCar = createAction(
  '[CarItem] Delete car',
  props<{ id: number }>()
);

export const deleteCarFailed = createAction(
  '[CarItem] Delete car failed',
  props<{ error: ErrorState }>()
);

export const createCar = createAction(
  '[CreateCar] Create car',
  props<{ name: string; color: string }>()
);

export const createCarFailed = createAction(
  '[CreateCar] Create car failed',
  props<{ error: ErrorState }>()
);
