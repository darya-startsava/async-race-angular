import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import {
  ERROR_MESSAGE_DURATION,
  NUMBER_OF_CARS_TO_GENERATE
} from '../constants';
import { GarageService } from '../garage.service';
import { generateCars } from '../redux/actions/cars.actions';
import { saveGarageCurrentPage } from '../redux/actions/pagination.actions';
import {
  selectCarsFeatureData,
  selectCarsFeatureError,
  selectCarsFeatureWinnerName,
  selectCarsFeatureWinnerTime
} from '../redux/selectors/cars.selectors';
import { CarsDataState, ErrorState } from '../redux/state.models';
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

  private error$: Observable<ErrorState | null> = this.store.select(
    selectCarsFeatureError
  );
  public winnerTime$: Observable<number | null> = this.store.select(
    selectCarsFeatureWinnerTime
  );

  public winnerName$: Observable<string> = this.store.select(
    selectCarsFeatureWinnerName
  );
  public numberOfCarsToGenerate = NUMBER_OF_CARS_TO_GENERATE;
  private subscriptions: Subscription[] = [];

  constructor(
    public garageService: GarageService,
    private store: Store,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe((params) => {
      this.store.dispatch(
        saveGarageCurrentPage({ currentPage: +params['page'] })
      );
    });
    this.subscriptions.push(routeSubscription);
    const errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        this.openSnackBar(
          `An error occurred: ${error.status} ${error.statusText}`
        );
      }
    });
    this.subscriptions.push(errorSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((i) => i.unsubscribe());
  }

  onGenerateCars(): void {
    this.store.dispatch(generateCars());
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: ERROR_MESSAGE_DURATION * 1000
    });
  }
}
