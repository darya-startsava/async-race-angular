import { createReducer, on } from '@ngrx/store';

import {
  changeWinnersSort,
  userErrorWinnersPage,
  winnersListLoading,
  winnersListSuccess
} from '../actions/winners.actions';
import { SortBy, SortOrder, WinnersState } from '../state.models';

const initialState: WinnersState = {
  data: [],
  winnersCount: 0,
  sortBy: SortBy.Id,
  sortOrder: SortOrder.ASC,
  error: null
};

export const WinnersReducer = createReducer<WinnersState>(
  initialState,
  on(
    winnersListLoading,
    (state): WinnersState => ({
      ...state,
      error: null
    })
  ),

  on(
    winnersListSuccess,
    (state, { data, winnersCount, allCarsData }): WinnersState => {
      const carMap = new Map(allCarsData.map((car) => [car.id, car]));
      const extendedWinnersData = data.map((i) => ({
        ...i,
        name: carMap.get(i.id).name,
        color: carMap.get(i.id).color
      }));
      return {
        ...state,
        data: extendedWinnersData,
        winnersCount: +winnersCount,
        error: null
      };
    }
  ),

  on(
    userErrorWinnersPage,
    (state, { error }): WinnersState => ({
      ...state,
      error
    })
  ),

  on(changeWinnersSort, (state, { sortBy }): WinnersState => {
    if (sortBy === state.sortBy) {
      return {
        ...state,
        sortOrder:
          state.sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC
      };
    }
    return {
      ...state,
      sortBy
    };
  })
);
