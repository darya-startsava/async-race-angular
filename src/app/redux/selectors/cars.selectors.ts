import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CarsState } from '../state.models';

export const selectCarsFeature = createFeatureSelector<CarsState>('cars');

export const selectCarsFeatureData = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.data
);

export const selectCarsFeatureCount = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.carCount
);
