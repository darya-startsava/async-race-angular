import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectPaginationFeatureWinnersCurrentPage,
  selectPaginationWinnersPageCount
} from '../../../redux/selectors/pagination.selectors';
import { selectWinnersFeatureCount } from '../../../redux/selectors/winners.selectors';

@Component({
  selector: 'app-winners-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './winners-pagination.component.html',
  styleUrl: './winners-pagination.component.scss'
})
export class WinnersPaginationComponent {
  public winnersCount$: Observable<number | null> = this.store.select(
    selectWinnersFeatureCount
  );
  public currentPage$: Observable<number> = this.store.select(
    selectPaginationFeatureWinnersCurrentPage
  );

  public pageCount$: Observable<number> = this.store.select(
    selectPaginationWinnersPageCount
  );
  constructor(private store: Store) {}
}
