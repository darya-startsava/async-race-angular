export interface AppState {
  cars: CarsState;
}

export interface CarsState {
  data: CarsDataState[];
  status: StatusState;
}

export interface CarsDataState {
  name: string;
  color: string;
  id: number;
}

export enum StatusState {
  Init = 'Init',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}
