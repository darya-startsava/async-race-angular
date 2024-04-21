import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { NUMBER_OF_CARS_TO_GENERATE } from '../constants';
import { GarageService } from '../garage.service';
import { carsListLoading, generateCars } from '../redux/actions/cars.actions';
import { selectCarsFeatureData } from '../redux/selectors/cars.selectors';
import { CarsDataState } from '../redux/state.models';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CreateCarComponent } from './components/create-car/create-car.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CarsListComponent,
    CreateCarComponent
  ],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit {
  public cars$: Observable<CarsDataState[]> = this.store.select(
    selectCarsFeatureData
  );
  public numberOfCarsToGenerate = NUMBER_OF_CARS_TO_GENERATE;
  constructor(
    public garageService: GarageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(carsListLoading());
  }

  onGenerateCars(): void {
    this.store.dispatch(generateCars());
  }
}
