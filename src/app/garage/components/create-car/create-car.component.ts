import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { createCar } from '../../../redux/actions/cars.actions';
import { CarRequest } from '../../models/cars.models';
import { CarPropertiesFormComponent } from '../car-properties-form/car-properties-form.component';

@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [CarPropertiesFormComponent],
  templateUrl: './create-car.component.html',
  styleUrl: './create-car.component.scss'
})
export class CreateCarComponent {
  constructor(private store: Store) {}
  public initialColor = '#29C5F6';
  public initialName = '';

  onCreate($event: CarRequest) {
    this.store.dispatch(createCar({ name: $event.name, color: $event.color }));
    console.log($event.name, $event.color);
  }
}
