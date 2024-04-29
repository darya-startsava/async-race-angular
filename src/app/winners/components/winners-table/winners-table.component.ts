import { Component, Input } from '@angular/core';

import { WinnersDataState } from '../../../redux/state.models';

@Component({
  selector: 'app-winners-table',
  standalone: true,
  imports: [],
  templateUrl: './winners-table.component.html',
  styleUrl: './winners-table.component.scss'
})
export class WinnersTableComponent {
  @Input() winners: WinnersDataState[];
}
