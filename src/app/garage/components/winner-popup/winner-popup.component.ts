import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { WinnerData } from '../../models/cars.models';

@Component({
  selector: 'app-winner-popup',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './winner-popup.component.html',
  styleUrl: './winner-popup.component.scss'
})
export class WinnerPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: WinnerData,
    public dialogRef: MatDialogRef<WinnerPopupComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
