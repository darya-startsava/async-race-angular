import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { ERROR_MESSAGE_DURATION } from '../constants';
import { saveWinnersCurrentPage } from '../redux/actions/pagination.actions';
import { selectPaginationFeatureWinnersCurrentPage } from '../redux/selectors/pagination.selectors';
import {
  selectWinnersFeatureData,
  selectWinnersFeatureError
} from '../redux/selectors/winners.selectors';
import { ErrorState, WinnersDataState } from '../redux/state.models';
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
  private error$: Observable<ErrorState | null> = this.store.select(
    selectWinnersFeatureError
  );
  private subscriptions: Subscription[] = [];
  public winners$: Observable<WinnersDataState[]> = this.store.select(
    selectWinnersFeatureData
  );
  public currentPage$: Observable<number> = this.store.select(
    selectPaginationFeatureWinnersCurrentPage
  );
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe((params) => {
      this.store.dispatch(
        saveWinnersCurrentPage({ currentPage: +params['page'] })
      );
    });
    this.subscriptions.push(routeSubscription);
    const errorSubscription = this.error$.subscribe((error) => {
      if (error) {
        this.openSnackBar(
          `An error occurred: ${error.status} ${error.statusText}`
        );
      }
    });
    this.subscriptions.push(errorSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((i) => i.unsubscribe());
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: ERROR_MESSAGE_DURATION * 1000
    });
  }
}
