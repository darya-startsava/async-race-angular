import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { resetRace, startRace } from '../../../redux/actions/race.actions';
import { selectCarsFeatureIsRace } from '../../../redux/selectors/cars.selectors';

@Component({
  selector: 'app-race-buttons',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './race-buttons.component.html',
  styleUrl: './race-buttons.component.scss'
})
export class RaceButtonsComponent {
  public isRace$: Observable<boolean> = this.store.select(
    selectCarsFeatureIsRace
  );
  constructor(private store: Store) {}

  onStartRace() {
    this.store.dispatch(startRace());
  }

  onResetRace() {
    this.store.dispatch(resetRace());
  }
}
