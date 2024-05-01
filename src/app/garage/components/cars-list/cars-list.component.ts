import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCarsFeatureIsRace } from '../../../redux/selectors/cars.selectors';
import { CarsDataState } from '../../../redux/state.models';
import { CarItemComponent } from '../car-item/car-item.component';
import { WinnerPopupComponent } from '../winner-popup/winner-popup.component';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [CommonModule, CarItemComponent, WinnerPopupComponent],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent implements OnChanges {
  @Input() cars: CarsDataState[];
  @Input() winnerTime: number;
  @Input() winnerName: string;
  public isRace$: Observable<boolean> = this.store.select(
    selectCarsFeatureIsRace
  );

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['winnerTime'] && changes['winnerTime'].currentValue) {
      this.openDialog();
    }
  }

  openDialog() {
    this.dialog.open(WinnerPopupComponent, {
      data: {
        name: this.winnerName,
        time: this.winnerTime
      }
    });
  }
}
