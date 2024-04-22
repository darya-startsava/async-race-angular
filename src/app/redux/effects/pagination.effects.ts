import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { carsListLoading } from '../actions/cars.actions';
import { saveGarageCurrentPage } from '../actions/pagination.actions';

@Injectable()
export class PaginationEffects {
  saveGarageCurrentPage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(saveGarageCurrentPage),
      map((action) => carsListLoading({ page: action.currentPage.toString() }))
    );
  });

  constructor(private actions$: Actions) {}
}
