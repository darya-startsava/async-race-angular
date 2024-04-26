import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCarsFeatureIsRace } from '../../../redux/selectors/cars.selectors';
import { CarsDataState } from '../../../redux/state.models';
import { CarItemComponent } from '../car-item/car-item.component';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, CarItemComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent {
  @Input() cars: CarsDataState[];
  public isRace$: Observable<boolean> = this.store.select(
    selectCarsFeatureIsRace
  );

  constructor(private store: Store) {}
}
