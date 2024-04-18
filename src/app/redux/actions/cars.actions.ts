import { createAction, props } from '@ngrx/store';

import { CarsDataState } from '../state.models';

export const carsListLoading = createAction('[Garage] Cars list loading');

export const carsListSuccess = createAction(
  '[Garage] Cars list  success',
  props<{ data: CarsDataState[] }>()
);
