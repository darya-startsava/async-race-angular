export interface CarResponse {
  name: string;
  color: string;
  id: number;
}

export interface CarRequest {
  name: string;
  color: string;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface EngineDriveResponse {
  success: boolean;
}

export enum EngineStatusRequest {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive'
}
