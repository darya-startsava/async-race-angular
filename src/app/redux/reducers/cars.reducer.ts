import { createReducer, on } from '@ngrx/store';

import {
  carsListLoading,
  carsListSuccess,
  deleteCar,
  userErrorGaragePage
} from '../actions/cars.actions';
import {
  driveEngineFailed,
  driveEngineLoading,
  driveEngineSuccess,
  stopEngineSuccess
} from '../actions/engine.actions';
import {
  checkRaceIsFinished,
  resetRace,
  startRace
} from '../actions/race.actions';
import { CarsState, EngineStatus } from '../state.models';

const initialState: CarsState = {
  data: [],
  carCount: 0,
  error: null,
  isRace: false,
  winnerId: null
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
      isRace: false,
      winnerId: null
    })
  ),

  on(
    carsListSuccess,
    (state, { data, carCount }): CarsState => ({
      ...state,
      data: data.map((i) => ({ ...i, ...initialCarPartialState })),
      carCount: +carCount,
      error: null
    })
  ),

  on(userErrorGaragePage, (state, { error }): CarsState => {
    return {
      ...state,
      error
    };
  }),

  on(deleteCar, (state): CarsState => ({ ...state, error: null })),

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
            return { ...i, ...initialCarPartialState };
          }
          return i;
        })
      }
    })
  ),

  on(startRace, (state): CarsState => ({ ...state, isRace: true })),

  on(
    resetRace,
    (state): CarsState => ({ ...state, isRace: false, winnerId: null })
  ),
  on(checkRaceIsFinished, (state): CarsState => {
    if (
      state.data.every(
        (i) =>
          i.engineStatus === EngineStatus.Failed ||
          i.engineStatus === EngineStatus.Success
      )
    ) {
      const [winner] = state.data
        .filter((i) => i.engineStatus === EngineStatus.Success)
        .sort((a, b) => b.velocity - a.velocity);
      return { ...state, winnerId: winner?.id || null };
    }
    return state;
  })
);
