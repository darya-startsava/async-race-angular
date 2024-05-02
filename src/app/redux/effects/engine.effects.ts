import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, filter, map, mergeMap, of } from 'rxjs';

import { ResponseStatusCodes } from '../../constants';
import { EngineService } from '../../engine.service';
import {
  EngineResponse,
  EngineStatusRequest
} from '../../garage/models/cars.models';
import { userErrorGaragePage } from '../actions/cars.actions';
import {
  driveEngineFailed,
  driveEngineLoading,
  driveEngineSuccess,
  startEngineLoading,
  stopEngineLoading,
  stopEngineSuccess
} from '../actions/engine.actions';
import { checkRaceIsFinished, resetRace } from '../actions/race.actions';
import {
  selectCarsFeatureData,
  selectCarsFeatureIsRace
} from '../selectors/cars.selectors';

@Injectable()
export class EngineEffects {
  startEngineLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startEngineLoading),
      mergeMap((action) =>
        this.engineService
          .toggleEngine(action.id, EngineStatusRequest.Started)
          .pipe(
            map((data: EngineResponse) =>
              driveEngineLoading({ id: action.id, data })
            ),
            catchError((error) =>
              of(
                userErrorGaragePage({
                  error: { status: error.status, statusText: error.statusText }
                })
              )
            )
          )
      )
    );
  });

  driveEngineLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(driveEngineLoading),
      mergeMap((action) =>
        this.engineService.driveEngine(action.id).pipe(
          map(() => driveEngineSuccess({ id: action.id })),
          catchError((error) => {
            if (error.status === ResponseStatusCodes.InternalServerError) {
              return of(driveEngineFailed({ id: action.id, error }));
            }
            return of(
              userErrorGaragePage({
                error: { status: error.status, statusText: error.statusText }
              })
            );
          })
        )
      )
    );
  });

  driveEngineCompleted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(driveEngineSuccess, driveEngineFailed),
      concatLatestFrom(() => this.store.select(selectCarsFeatureIsRace)),
      filter(([_, isRace]) => isRace),
      map(() => checkRaceIsFinished())
    );
  });

  stopEngineLoading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stopEngineLoading),
      mergeMap((action) =>
        this.engineService
          .toggleEngine(action.id, EngineStatusRequest.Stopped)
          .pipe(
            map(() => stopEngineSuccess({ id: action.id })),
            catchError((error) =>
              of(
                userErrorGaragePage({
                  error: { status: error.status, statusText: error.statusText }
                })
              )
            )
          )
      )
    );
  });

  resetRace$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resetRace),
      concatLatestFrom(() => this.store.select(selectCarsFeatureData)),
      mergeMap(([_, data]) => {
        const stopActions = data.map((car) =>
          stopEngineLoading({ id: car.id })
        );
        return stopActions;
      })
    );
  });

  constructor(
    private actions$: Actions,
    private engineService: EngineService,
    private store: Store
  ) {}
}
