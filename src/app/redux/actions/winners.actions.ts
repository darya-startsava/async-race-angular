import { createAction, props } from '@ngrx/store';

import { CarResponse } from '../../garage/models/cars.models';
import { Winner } from '../../winners/models/winners.models';
import { ErrorState, SortBy } from '../state.models';

export const winnersListLoading = createAction(
  '[Winners] Winners list loading',
  props<{ page: number }>()
);

export const winnersListSuccess = createAction(
  '[Winners] Winners list success',
  props<{ data: Winner[]; winnersCount: string; allCarsData: CarResponse[] }>()
);

export const userErrorWinnersPage = createAction(
  '[Winners] User error',
  props<{ error: ErrorState }>()
);

export const getWinnerLoading = createAction(
  '[Garage] Get winner loading',
  props<{ id: number }>()
);

export const updateWinnerLoading = createAction(
  '[Garage] Update winner loading',
  props<{ id: number; wins: number; time: number }>()
);

export const createWinnerLoading = createAction(
  '[Garage] Create winner loading',
  props<{ id: number; time: number }>()
);

export const deleteWinner = createAction(
  '[Garage] delete winner',
  props<{ id: number }>()
);

export const changeWinnersSort = createAction(
  '[WinnersTableComponent] change winners sort',
  props<{ sortBy: SortBy }>()
);
