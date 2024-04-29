import { createAction, props } from '@ngrx/store';

import { Winner } from '../../winners/models/winners.models';
import { ErrorState } from '../state.models';
import { CarResponse } from '../../garage/models/cars.models';

export const winnersListLoading = createAction(
  '[Winners] Winners list loading',
  props<{ page: number }>()
);

export const winnersListSuccess = createAction(
  '[Winners] Winners list success',
  props<{ data: Winner[]; winnersCount: string; allCarsData: CarResponse[] }>()
);

export const winnersListFailed = createAction(
  '[Winners] Winners list Failed',
  props<{ error: ErrorState }>()
);

export const getWinnerLoading = createAction(
  '[Garage] Get winner loading',
  props<{ id: number }>()
);

export const getWinnerFailed = createAction(
  '[Garage] Get winner failed',
  props<{ error: ErrorState }>()
);

export const updateWinnerLoading = createAction(
  '[Garage] Update winner loading',
  props<{ id: number; wins: number; time: number }>()
);

export const updateWinnerFailed = createAction(
  '[Garage] Update winner failed',
  props<{ error: ErrorState }>()
);

export const createWinnerLoading = createAction(
  '[Garage] Create winner loading',
  props<{ id: number; time: number }>()
);

export const createWinnerFailed = createAction(
  '[Garage] Create winner failed',
  props<{ error: ErrorState }>()
);

export const deleteWinner = createAction(
  '[Garage] delete winner',
  props<{ id: number }>()
);

export const deleteWinnerFailed = createAction(
  '[Garage] delete winner failed',
  props<{ error: ErrorState }>()
);
