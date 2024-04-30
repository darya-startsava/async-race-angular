import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { carsListLoading } from '../actions/cars.actions';
import {
  saveGarageCurrentPage,
  saveWinnersCurrentPage
} from '../actions/pagination.actions';
import { winnersListLoading } from '../actions/winners.actions';

@Injectable()
export class PaginationEffects {
  saveGarageCurrentPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveGarageCurrentPage),
      map((action) => carsListLoading({ page: action.currentPage }))
    );
  });

  saveWinnersCurrentPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveWinnersCurrentPage),
      map((action) => winnersListLoading({ page: action.currentPage }))
    );
  });

  constructor(private actions$: Actions) {}
}
