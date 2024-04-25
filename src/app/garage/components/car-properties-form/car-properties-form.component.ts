import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { DEFAULT_NEW_CAR_COLOR } from '../../../constants';

@Component({
  selector: 'app-car-properties-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './car-properties-form.component.html',
  styleUrl: './car-properties-form.component.scss'
})
export class CarPropertiesFormComponent implements OnInit {
  @Input() initialColor: string;
  @Input() initialName: string;
  @Input() title: string;
  @Input() buttonName: string;
  @Output() formSubmitted = new EventEmitter<{ name: string; color: string }>();
  carPropertiesForm = new FormGroup({
    color: new FormControl(DEFAULT_NEW_CAR_COLOR, [Validators.required]),
    name: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    if (this.initialColor) {
      this.carPropertiesForm.patchValue({ color: this.initialColor });
    }
    if (this.initialName) {
      this.carPropertiesForm.patchValue({ name: this.initialName });
    }
  }

  onSubmit() {
    this.formSubmitted.emit({ name: this.name, color: this.color });
    this.carPropertiesForm.reset({ color: DEFAULT_NEW_CAR_COLOR, name: '' });
  }

  get name(): string {
    return this.carPropertiesForm.value.name;
  }

  get color(): string {
    return this.carPropertiesForm.value.color;
  }
}
