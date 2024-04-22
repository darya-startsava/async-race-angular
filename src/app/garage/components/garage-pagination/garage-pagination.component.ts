import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectCarsFeatureCount } from '../../../redux/selectors/cars.selectors';
import {
  selectPaginationFeatureGarageCurrentPage,
  selectPaginationGaragePageCount
} from '../../../redux/selectors/pagination.selectors';

@Component({
  selector: 'app-garage-pagination',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './garage-pagination.component.html',
  styleUrl: './garage-pagination.component.scss'
})
export class GaragePaginationComponent {
  public carCount$: Observable<number> = this.store.select(
    selectCarsFeatureCount
  );
  public currentPage$: Observable<number> = this.store.select(
    selectPaginationFeatureGarageCurrentPage
  );

  public pageCount$: Observable<number> = this.store.select(
    selectPaginationGaragePageCount
  );
  constructor(private store: Store) {}
}
