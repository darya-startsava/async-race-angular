import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import { deleteCar, updateCar } from '../../../redux/actions/cars.actions';
import { CarRequest } from '../../models/cars.models';
import { CarPropertiesFormComponent } from '../car-properties-form/car-properties-form.component';
import { CarImageComponent } from '../car-image/car-image.component';
import {
  startEngineLoading,
  stopEngineLoading
} from '../../../redux/actions/engine.actions';
import { CarsDataState, EngineStatus } from '../../../redux/state.models';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [
    MatButtonModule,
    CarPropertiesFormComponent,
    CarImageComponent,
    MatIconModule
  ],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {
  public isBeingUpdated = false;
  public engineStatus = EngineStatus;
  constructor(private store: Store) {}
  @Input() car: CarsDataState;
  @Input() index: number;

  onDelete(id: number): void {
    this.store.dispatch(deleteCar({ id }));
  }

  onUpdate() {
    this.isBeingUpdated = true;
  }

  onSaveUpdates($event: CarRequest, id: number): void {
    this.store.dispatch(updateCar({ ...$event, id }));
    this.isBeingUpdated = false;
  }

  onCancel() {
    this.isBeingUpdated = false;
  }

  onStartEngine() {
    this.store.dispatch(startEngineLoading({ id: this.car.id }));
  }
  onStopEngine() {
    this.store.dispatch(stopEngineLoading({ id: this.car.id }));
  }
}
