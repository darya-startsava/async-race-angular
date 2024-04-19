import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';

import { createCar } from '../../../redux/actions/cars.actions';

@Component({
  selector: 'app-create-car',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-car.component.html',
  styleUrl: './create-car.component.scss'
})
export class CreateCarComponent {
  createCarForm = new FormGroup({
    color: new FormControl('#29C5F6', [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  constructor(private store: Store) {}

  onCreate() {
    this.store.dispatch(createCar({ name: this.name, color: this.color }));
    this.createCarForm.reset();
  }
  get name(): string {
    return this.createCarForm.value.name;
  }

  get color(): string {
    return this.createCarForm.value.color;
  }
}
