import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { deleteCar, updateCar } from '../../../redux/actions/cars.actions';
import { CarResponse } from '../../models/cars.models';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {
  public isBeingUpdated = false;
  constructor(private store: Store) {}
  @Input() car: CarResponse;

  onDelete(id: number): void {
    this.store.dispatch(deleteCar({ id }));
  }

  onUpdate() {
    this.isBeingUpdated = true;
  }

  onSaveUpdates(id: number): void {
    this.store.dispatch(updateCar({ id, name: 'car', color: '#ffffff' }));
  }
}
