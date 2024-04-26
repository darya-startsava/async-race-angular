import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { NUMBER_OF_CARS_TO_GENERATE } from '../constants';
import { GarageService } from '../garage.service';
import { generateCars } from '../redux/actions/cars.actions';
import { saveGarageCurrentPage } from '../redux/actions/pagination.actions';
import {
  selectCarsFeatureData,
  selectCarsFeatureWinnerName,
  selectCarsFeatureWinnerTime
} from '../redux/selectors/cars.selectors';
import { CarsDataState } from '../redux/state.models';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { GaragePaginationComponent } from './components/garage-pagination/garage-pagination.component';
import { RaceButtonsComponent } from './components/race-buttons/race-buttons.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    CarsListComponent,
    CreateCarComponent,
    GaragePaginationComponent,
    RaceButtonsComponent
  ],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit, OnDestroy {
  public cars$: Observable<CarsDataState[]> = this.store.select(
    selectCarsFeatureData
  );
  public winnerTime$: Observable<number | null> = this.store.select(
    selectCarsFeatureWinnerTime
  );

  public winnerName$: Observable<string> = this.store.select(
    selectCarsFeatureWinnerName
  );
  public numberOfCarsToGenerate = NUMBER_OF_CARS_TO_GENERATE;
  private subscription: Subscription;

  constructor(
    public garageService: GarageService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.store.dispatch(
        saveGarageCurrentPage({ currentPage: +params['page'] })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onGenerateCars(): void {
    this.store.dispatch(generateCars());
  }
}
