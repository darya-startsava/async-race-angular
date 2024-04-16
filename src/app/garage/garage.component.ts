import { Component, OnInit } from '@angular/core';

import { GarageService } from '../garage.service';

@Component({
  selector: 'app-garage',
  standalone: true,
  imports: [],
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit {
  constructor(private garageService: GarageService) {}

  ngOnInit(): void {
    this.showCars();
  }

  showCars() {
    this.garageService.getCars().subscribe((cars) => console.log(cars));
  }
}
