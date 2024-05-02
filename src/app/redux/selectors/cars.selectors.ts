import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CarsDataState, CarsState } from '../state.models';

export const selectCarsFeature = createFeatureSelector<CarsState>('cars');

export const selectCarsFeatureData = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.data
);

export const selectCarsFeatureError = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.error
);

export const selectCarsFeatureCount = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.carCount
);

export const selectCarsFeatureIsRace = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.isRace
);

export const selectCarsFeatureWinnerId = createSelector(
  selectCarsFeature,
  (state: CarsState) => state.winnerId
);

export const selectCarsFeatureWinnerTime = createSelector(
  selectCarsFeatureData,
  selectCarsFeatureWinnerId,
  (data: CarsDataState[], id: number) => {
    const carWinner = data.find((i) => i.id === id);
    if (carWinner) {
      return Math.round(carWinner.distance / carWinner.velocity / 10) / 100;
    }
    return null;
  }
);

export const selectCarsFeatureWinnerName = createSelector(
  selectCarsFeatureData,
  selectCarsFeatureWinnerId,
  (data: CarsDataState[], id: number) => {
    const carWinner = data.find((i) => i.id === id);
    if (carWinner) {
      return carWinner.name;
    }
    return '';
  }
);
