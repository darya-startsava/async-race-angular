import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WinnersState } from '../state.models';

export const selectWinnersFeature =
  createFeatureSelector<WinnersState>('winners');

export const selectWinnersFeatureData = createSelector(
  selectWinnersFeature,
  (state: WinnersState) => state.data
);

export const selectWinnersFeatureError = createSelector(
  selectWinnersFeature,
  (state: WinnersState) => state.error
);

export const selectWinnersFeatureCount = createSelector(
  selectWinnersFeature,
  (state: WinnersState) => state.winnersCount
);

export const selectWinnersFeatureSortBy = createSelector(
  selectWinnersFeature,
  (state: WinnersState) => state.sortBy
);

export const selectWinnersFeatureSortOrder = createSelector(
  selectWinnersFeature,
  (state: WinnersState) => state.sortOrder
);
