import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CARS_PER_PAGE_GARAGE } from '../../constants';
import { PaginationState } from '../state.models';
import { selectCarsFeatureCount } from './cars.selectors';

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
