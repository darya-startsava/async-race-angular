import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { winnersListLoading } from '../redux/actions/winners.actions';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.showWinners();
  }

  showWinners() {
    this.store.dispatch(winnersListLoading({ page: 1 }));
  }
}
