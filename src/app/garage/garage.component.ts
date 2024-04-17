import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { GarageService } from '../garage.service';
import { CarsListComponent } from './components/cars-list/cars-list.component';
import { CarResponse } from './models/cars.models';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [CommonModule, CarsListComponent],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit {
  public cars$: Observable<CarResponse[]>;
  constructor(public garageService: GarageService) {}

  ngOnInit(): void {
    this.cars$ = this.garageService.getCars();
  }
}
