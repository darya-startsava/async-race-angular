import { createAction, props } from '@ngrx/store';

export const saveGarageCurrentPage = createAction(
  '[Garage] Save garage current page',
  props<{ currentPage: number }>()
);

export const saveWinnersCurrentPage = createAction(
  '[Winners] Save winners current page',
  props<{ currentPage: number }>()
);
