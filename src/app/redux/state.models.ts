export interface AppState {
  cars: CarsState;
  pagination: PaginationState;
}

export interface CarsState {
  data: CarsDataState[];
  carCount: number;
  status: StatusState;
  error: ErrorState | null;
}

export interface CarsDataState {
  name: string;
  color: string;
  id: number;
}

export interface PaginationState {
  garageCurrentPage: number;
  winnersCurrentPage: number;
}

export enum StatusState {
  Init = 'Init',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export interface ErrorState {
  status: number;
  message: string;
}
