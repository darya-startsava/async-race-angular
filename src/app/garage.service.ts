import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { URL } from './constants';
import { CarRequest, CarResponse } from './garage/models/cars.models';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
  private readonly garageUrl = `${URL}/garage`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  getCars(): Observable<CarResponse[]> {
    return this.http.get<CarResponse[]>(this.garageUrl);
  }

  deleteCar(id: number) {
    return this.http.delete(`${this.garageUrl}/${id}`);
  }

  createCar(carRequest: CarRequest) {
    return this.http.post(this.garageUrl, carRequest, this.httpOptions);
  }
}
