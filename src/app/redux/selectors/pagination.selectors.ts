import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CARS_PER_PAGE_GARAGE, CARS_PER_PAGE_WINNERS } from '../../constants';
import { PaginationState } from '../state.models';
import { selectCarsFeatureCount } from './cars.selectors';
import { selectWinnersFeatureCount } from './winners.selectors';

export const selectPaginationFeature =
  createFeatureSelector<PaginationState>('pagination');

export const selectPaginationFeatureGarageCurrentPage = createSelector(
  selectPaginationFeature,
  (state: PaginationState) => state.garageCurrentPage
);

export const selectPaginationGaragePageCount = createSelector(
  selectCarsFeatureCount,
  (carsCount: number) => Math.ceil(carsCount / CARS_PER_PAGE_GARAGE)
);

export const selectPaginationFeatureWinnersCurrentPage = createSelector(
  selectPaginationFeature,
  (state: PaginationState) => state.winnersCurrentPage
);

export const selectPaginationWinnersPageCount = createSelector(
  selectWinnersFeatureCount,
  (winnersCount: number) => Math.ceil(winnersCount / CARS_PER_PAGE_WINNERS)
);
