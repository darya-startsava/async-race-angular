import { createAction } from '@ngrx/store';

export const startRace = createAction('[CarItem] Start race');

export const resetRace = createAction('[CarItem] Reset race');

export const checkRaceIsFinished = createAction(
  '[CarItem] Check if race is finished'
);
