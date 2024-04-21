import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { NUMBER_OF_CARS_TO_GENERATE, URL } from './constants';
import { CarRequest, CarResponse } from './garage/models/cars.models';
import { generateRandomCar } from './utils/generate-random-car';

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

  createCar(carRequest: CarRequest): Observable<void> {
    return this.http.post<void>(this.garageUrl, carRequest, this.httpOptions);
  }

  updateCar(carRequest: CarRequest, id: number) {
    return this.http.put(
      `${this.garageUrl}/${id}`,
      carRequest,
      this.httpOptions
    );
  }

  generateCars(): Observable<void[]> {
    const requests: Observable<void>[] = [];
    for (let i = 0; i < NUMBER_OF_CARS_TO_GENERATE; i++) {
      const car: CarRequest = generateRandomCar();
      requests.push(this.createCar(car));
    }
    return forkJoin(requests);
  }
}
