import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  driveEngineFailed,
  driveEngineLoading,
  driveEngineSuccess,
  startEngineFailed,
  startEngineLoading,
  stopEngineFailed,
  stopEngineLoading,
  stopEngineSuccess
} from '../actions/engine.actions';
import { EngineService } from '../../engine.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  EngineResponse,
  EngineStatusRequest
} from '../../garage/models/cars.models';

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
            catchError((error) => of(startEngineFailed({ error })))
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
          catchError((error) => of(driveEngineFailed({ id: action.id, error })))
        )
      )
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
            catchError((error) => of(stopEngineFailed({ error })))
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private engineService: EngineService
  ) {}
}
