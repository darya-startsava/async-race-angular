import { createAction, props } from '@ngrx/store';

import { CarResponse } from '../../garage/models/cars.models';
import { ErrorState } from '../state.models';

export const carsListLoading = createAction(
  '[Garage] Cars list loading',
  props<{ page: number }>()
);

export const carsListSuccess = createAction(
  '[Garage] Cars list success',
  props<{ data: CarResponse[]; carCount: string }>()
);

export const userErrorGaragePage = createAction(
  '[Garage] User error',
  props<{ error: ErrorState }>()
);

export const deleteCar = createAction(
  '[CarItem] Delete car',
  props<{ id: number }>()
);

export const createCar = createAction(
  '[CreateCar] Create car',
  props<{ name: string; color: string }>()
);

export const updateCar = createAction(
  '[CarItem] Update car',
  props<{ name: string; color: string; id: number }>()
);

export const generateCars = createAction('[Garage] Generate cars');
