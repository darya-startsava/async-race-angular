import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from './constants';
import { CarResponse } from './garage/models/cars.models';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private readonly garageUrl = `${URL}/garage`;
  constructor(private http: HttpClient) {}

  getCars(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(this.garageUrl);
  }

  deleteCar(id: number): void {
    this.http.delete(`${this.garageUrl}/${id}`);
  }
}
