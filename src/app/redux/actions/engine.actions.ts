import { createAction, props } from '@ngrx/store';
import { ErrorState } from '../state.models';
import { EngineResponse } from '../../garage/models/cars.models';

export const startEngineLoading = createAction(
  '[CarItem] Start engine loading',
  props<{ id: number }>()
);

export const startEngineFailed = createAction(
  '[CarItem] Start engine failed',
  props<{ error: ErrorState }>()
);

export const driveEngineLoading = createAction(
  '[CarItem] Drive engine loading',
  props<{ id: number; data: EngineResponse }>()
);

export const driveEngineSuccess = createAction(
  '[CarItem] Drive engine success',
  props<{ id: number }>()
);

export const driveEngineFailed = createAction(
  '[CarItem] Drive engine failed',
  props<{ error: ErrorState; id: number }>()
);

export const stopEngineLoading = createAction(
  '[CarItem] Stop engine loading',
  props<{ id: number }>()
);

export const stopEngineSuccess = createAction(
  '[CarItem] Stop engine success',
  props<{ id: number }>()
);

export const stopEngineFailed = createAction(
  '[CarItem] Stop engine failed',
  props<{ error: ErrorState }>()
);
