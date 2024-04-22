import { createAction, props } from '@ngrx/store';

export const saveGarageCurrentPage = createAction(
  '[Garage] Save garage current page',
  props<{ currentPage: number }>()
);
