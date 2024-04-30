import { createReducer, on } from '@ngrx/store';

import {
  saveGarageCurrentPage,
  saveWinnersCurrentPage
} from '../actions/pagination.actions';
import { PaginationState } from '../state.models';

const initialState: PaginationState = {
  garageCurrentPage: 1,
  winnersCurrentPage: 1
};

export const PaginationReducer = createReducer<PaginationState>(
  initialState,
  on(
    saveGarageCurrentPage,
    (state, { currentPage }): PaginationState => ({
      ...state,
      garageCurrentPage: currentPage
    })
  ),
  on(
    saveWinnersCurrentPage,
    (state, { currentPage }): PaginationState => ({
      ...state,
      winnersCurrentPage: currentPage
    })
  )
);
