import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GarageService } from '../garage.service';
import { carsListLoading } from '../redux/actions/cars.actions';
import { selectCarsFeatureData } from '../redux/selectors/cars.selectors';
import { CarsDataState } from '../redux/state.models';
import { CarsListComponent } from './components/cars-list/cars-list.component';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, CarsListComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit {
  public cars$: Observable<CarsDataState[]> = this.store.select(
    selectCarsFeatureData
  );
  constructor(
    public garageService: GarageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(carsListLoading());
  }
}
