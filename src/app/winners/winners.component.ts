import { Component, OnInit } from '@angular/core';

import { WinnersService } from '../winners.service';

@Component({
  selector: 'app-winners',
  standalone: true,
  imports: [],
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit {
  constructor(private winnersService: WinnersService) {}

  ngOnInit(): void {
    this.showWinners();
  }

  showWinners() {
    this.winnersService
      .getWinners()
      .subscribe((winners) => console.log(winners));
  }
}
