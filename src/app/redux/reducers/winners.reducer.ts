import { createReducer, on } from '@ngrx/store';

import {
  winnersListFailed,
  winnersListLoading,
  winnersListSuccess
} from '../actions/winners.actions';
import { StatusState, WinnersState } from '../state.models';

const initialState: WinnersState = {
  data: [],
  winnersCount: 0,
  status: StatusState.Init,
  error: null
};

export const WinnersReducer = createReducer<WinnersState>(
  initialState,
  on(
    winnersListLoading,
    (state): WinnersState => ({
      ...state,
      status: StatusState.Loading,
      error: null
    })
  ),

  on(
    winnersListSuccess,
    (_, { data, winnersCount, allCarsData }): WinnersState => {
      const carMap = new Map(allCarsData.map((car) => [car.id, car]));
      const extendedWinnersData = data.map((i) => ({
        ...i,
        name: carMap.get(i.id).name,
        color: carMap.get(i.id).color
      }));
      return {
        data: extendedWinnersData,
        winnersCount: +winnersCount,
        status: StatusState.Success,
        error: null
      };
    }
  ),

  on(
    winnersListFailed,
    (state, { error }): WinnersState => ({
      ...state,
      error,
      status: StatusState.Failed
    })
  )
);
