import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { DEFAULT_NEW_CAR_COLOR } from '../../../constants';

@Component({
  selector: 'app-car-properties-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './car-properties-form.component.html',
  styleUrl: './car-properties-form.component.scss'
})
export class CarPropertiesFormComponent implements OnInit, OnDestroy {
  @Input() initialColor: string;
  @Input() initialName: string;
  @Input() title: string;
  @Input() buttonName: string;
  @Input() isCreatingForm: boolean;
  @Output() formSubmitted = new EventEmitter<{ name: string; color: string }>();

  carPropertiesForm = new FormGroup({
    color: new FormControl(DEFAULT_NEW_CAR_COLOR, [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  subscription: Subscription;

  ngOnInit(): void {
    let storedName;
    let storedColor;
    if (this.isCreatingForm) {
      const carData = sessionStorage.getItem('createCar');

      if (carData) {
        const { name, color } = JSON.parse(carData);
        storedName = name;
        storedColor = color;
      }
      this.subscription = this.carPropertiesForm.valueChanges.subscribe(
        (values) => {
          sessionStorage.setItem('createCar', JSON.stringify(values));
        }
      );
    }

    this.carPropertiesForm.patchValue({
      color: storedColor || this.initialColor
    });

    this.carPropertiesForm.patchValue({ name: storedName || this.initialName });
  }

  onSubmit() {
    this.formSubmitted.emit({ name: this.name, color: this.color });
    this.carPropertiesForm.reset({ color: DEFAULT_NEW_CAR_COLOR, name: '' });
    sessionStorage.removeItem('createCar');
  }

  get name(): string {
    return this.carPropertiesForm.value.name;
  }

  get color(): string {
    return this.carPropertiesForm.value.color;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
