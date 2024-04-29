export interface AppState {
  cars: CarsState;
  pagination: PaginationState;
  winners: WinnersState;
}

export interface CarsState {
  data: CarsDataState[];
  carCount: number;
  status: StatusState;
  error: ErrorState | null;
  isRace: boolean;
  winnerId: number | null;
}

export interface CarsDataState {
  name: string;
  color: string;
  id: number;
  engineStatus: EngineStatus;
  velocity: number;
  distance: number;
}

export interface WinnersState {
  data: WinnersDataState[];
  winnersCount: number;
  status: StatusState;
  error: ErrorState | null;
}

export interface WinnersDataState {
  id: number;
  wins: number;
  time: number;
  name: string;
  color: string;
}

export interface RaceParticipant {
  id: number;
  time: number;
  isSuccess: boolean | null;
}

export enum EngineStatus {
  Init = 'Init',
  Drive = 'Drive',
  Failed = 'Failed',
  Success = 'Success'
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
  statusText: string;
}
