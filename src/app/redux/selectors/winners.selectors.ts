import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WinnersState } from '../state.models';

export const selectWinnersFeature =
  createFeatureSelector<WinnersState>('winners');

export const selectWinnersFeatureData = createSelector(
  selectWinnersFeature,
  (state: WinnersState) => state.data
);
