import { Injectable } from '@angular/core';
import { URL } from './constants';
import { HttpClient } from '@angular/common/http';
import {
  EngineDriveResponse,
  EngineResponse,
  EngineStatusRequest
} from './garage/models/cars.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  private readonly engineUrl = `${URL}/engine`;

  constructor(private http: HttpClient) {}

  toggleEngine(
    id: number,
    status: EngineStatusRequest
  ): Observable<EngineResponse> {
    return this.http.patch<EngineResponse>(
      `${this.engineUrl}?id=${id}&status=${status}`,
      null
    );
  }

  driveEngine(id: number): Observable<EngineDriveResponse> {
    return this.http.patch<EngineDriveResponse>(
      `${this.engineUrl}?id=${id}&status=${EngineStatusRequest.Drive}`,
      null
    );
  }
}
