import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { deleteCar, updateCar } from '../../../redux/actions/cars.actions';
import { CarRequest, CarResponse } from '../../models/cars.models';
import { CarPropertiesFormComponent } from '../car-properties-form/car-properties-form.component';
import { CarImageComponent } from '../car-image/car-image.component';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [MatButtonModule, CarPropertiesFormComponent, CarImageComponent],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {
  public isBeingUpdated = false;
  constructor(private store: Store) {}
  @Input() car: CarResponse;
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
}
