import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { GarageService } from '../../../garage.service';
import { CarResponse } from '../../models/cars.models';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent {
  constructor(private garageService: GarageService) {}
  @Input() car: CarResponse;

  onDelete(id: number): void {
    this.garageService.deleteCar(id);
  }
}
