import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { CarImageComponent } from '../../../garage/components/car-image/car-image.component';
import { changeWinnersSort } from '../../../redux/actions/winners.actions';
import { SortBy, WinnersDataState } from '../../../redux/state.models';

@Component({
  selector: 'app-winners-table',
  standalone: true,
  imports: [CarImageComponent],
  templateUrl: './winners-table.component.html',
  styleUrl: './winners-table.component.scss'
})
export class WinnersTableComponent {
  @Input() winners: WinnersDataState[];

  constructor(public store: Store) {}

  onBestTimeSort() {
    this.store.dispatch(changeWinnersSort({ sortBy: SortBy.Time }));
  }

  onNumberOfWinsSort() {
    this.store.dispatch(changeWinnersSort({ sortBy: SortBy.Wins }));
  }
}
