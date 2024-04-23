import { createReducer, on } from '@ngrx/store';

import {
  carsListFailed,
  carsListLoading,
  carsListSuccess,
  deleteCar,
  deleteCarFailed
} from '../actions/cars.actions';
import { CarsState, EngineStatus, StatusState } from '../state.models';
import {
  driveEngineFailed,
  driveEngineLoading,
  driveEngineSuccess,
  stopEngineSuccess
} from '../actions/engine.actions';

const initialState: CarsState = {
  data: [],
  carCount: 0,
  error: null,
  status: StatusState.Init
};

const initialCarPartialState = {
  engineStatus: EngineStatus.Init,
  velocity: 0,
  distance: 0
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
    (state, { data, carCount }): CarsState => ({
      data: data.map((i) => ({ ...i, ...initialCarPartialState })),
      carCount: +carCount,
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
  }),

  on(
    driveEngineLoading,
    (state, { id, data }): CarsState => ({
      ...state,
      ...{
        data: state.data.map((i) => {
          if (i.id === id) {
            return {
              ...i,
              engineStatus: EngineStatus.Drive,
              velocity: data.velocity,
              distance: data.distance
            };
          }
          return i;
        })
      }
    })
  ),

  on(
    driveEngineSuccess,
    (state, { id }): CarsState => ({
      ...state,
      ...{
        data: state.data.map((i) => {
          if (i.id === id && i.engineStatus === EngineStatus.Drive) {
            return { ...i, engineStatus: EngineStatus.Success };
          }
          return i;
        })
      }
    })
  ),

  on(
    driveEngineFailed,
    (state, { id }): CarsState => ({
      ...state,
      ...{
        data: state.data.map((i) => {
          if (i.id === id && i.engineStatus === EngineStatus.Drive) {
            return { ...i, engineStatus: EngineStatus.Failed };
          }
          return i;
        })
      }
    })
  ),

  on(
    stopEngineSuccess,
    (state, { id }): CarsState => ({
      ...state,
      ...{
        data: state.data.map((i) => {
          if (i.id === id) {
            return { ...i, engineStatus: EngineStatus.Init };
          }
          return i;
        })
      }
    })
  )
);
