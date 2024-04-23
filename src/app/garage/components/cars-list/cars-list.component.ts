import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CarItemComponent } from '../car-item/car-item.component';
import { CarsDataState } from '../../../redux/state.models';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, CarItemComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent {
  @Input() cars: CarsDataState[];
}
