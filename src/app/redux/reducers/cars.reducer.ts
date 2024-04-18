import { createReducer, on } from '@ngrx/store';

import {
  carsListFailed,
  carsListLoading,
  carsListSuccess,
  deleteCar,
  deleteCarFailed
} from '../actions/cars.actions';
import { CarsState, StatusState } from '../state.models';

const initialState: CarsState = {
  data: [],
  error: null,
  status: StatusState.Init
};

export const CarsReducer = createReducer<CarsState>(
  initialState,
  on(
    carsListLoading,
    (state): CarsState => ({
      ...state,
      error: null,
      status: StatusState.Loading
    })
  ),
  on(
    carsListSuccess,
    (state, { data }): CarsState => ({
      data,
      error: null,
      status: StatusState.Success
    })
  ),
  on(carsListFailed, (state, { error }): CarsState => {
    return {
      ...state,
      error,
      status: StatusState.Failed
    };
  }),
  on(deleteCar, (state): CarsState => ({ ...state, error: null })),
  on(deleteCarFailed, (state, { error }): CarsState => {
    return {
      ...state,
      error
    };
  })
);
