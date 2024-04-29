import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { winnersListLoading } from '../redux/actions/winners.actions';
import { selectWinnersFeatureData } from '../redux/selectors/winners.selectors';
import { WinnersDataState } from '../redux/state.models';
import { WinnersTableComponent } from './components/winners-table/winners-table.component';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [WinnersTableComponent, CommonModule],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit {
  public winners$: Observable<WinnersDataState[]> = this.store.select(
    selectWinnersFeatureData
  );
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.showWinners();
  }

  showWinners() {
    this.store.dispatch(winnersListLoading({ page: 1 }));
  }
}
