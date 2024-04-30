import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { saveWinnersCurrentPage } from '../redux/actions/pagination.actions';
import { selectPaginationFeatureWinnersCurrentPage } from '../redux/selectors/pagination.selectors';
import { selectWinnersFeatureData } from '../redux/selectors/winners.selectors';
import { WinnersDataState } from '../redux/state.models';
import { WinnersPaginationComponent } from './components/winners-pagination/winners-pagination.component';
import { WinnersTableComponent } from './components/winners-table/winners-table.component';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [WinnersTableComponent, CommonModule, WinnersPaginationComponent],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public winners$: Observable<WinnersDataState[]> = this.store.select(
    selectWinnersFeatureData
  );
  public currentPage$: Observable<number> = this.store.select(
    selectPaginationFeatureWinnersCurrentPage
  );
  constructor(
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.store.dispatch(
        saveWinnersCurrentPage({ currentPage: +params['page'] })
      );
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
