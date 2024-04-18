import { createReducer, on } from '@ngrx/store';

import { carsListLoading, carsListSuccess } from '../actions/cars.actions';
import { CarsState, StatusState } from '../state.models';

const initialState: CarsState = {
  data: [],
  status: StatusState.Init
};

export const CarsReducer = createReducer<CarsState>(
  initialState,
  on(
    carsListLoading,
    (state): CarsState => ({ ...state, status: StatusState.Loading })
  ),
  on(
    carsListSuccess,
    (state, { data }): CarsState => ({ data, status: StatusState.Success })
  )
);
