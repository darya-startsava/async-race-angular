import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';

import {
  INDENT_LEFT,
  INDENT_LEFT_NUMBER,
  INDENT_RIGHT,
  INDENT_RIGHT_NUMBER
} from '../../../constants';
import { deleteCar, updateCar } from '../../../redux/actions/cars.actions';
import {
  startEngineLoading,
  stopEngineLoading
} from '../../../redux/actions/engine.actions';
import {
  CarsDataState,
  EngineStatus,
} from '../../../redux/state.models';
import { CarRequest } from '../../models/cars.models';
import { CarImageComponent } from '../car-image/car-image.component';
import { CarPropertiesFormComponent } from '../car-properties-form/car-properties-form.component';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [
    MatButtonModule,
    CarPropertiesFormComponent,
    CarImageComponent,
    MatIconModule
  ],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent implements OnChanges, AfterViewInit {
  public isBeingUpdated = false;
  public engineStatusEnum = EngineStatus;
  public carImage: HTMLElement;
  constructor(
    private store: Store,
    private el: ElementRef
  ) {}
  @Input() car: CarsDataState;
  @Input() index: number;
  @Input() engineStatus: EngineStatus;
  @Input() isRace: boolean;

  @ViewChild('carRace') carRace: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isRace'] && changes['isRace'].currentValue) {
      this.onStartEngine();
    }
    if (changes['engineStatus']) {
      const currentEngineStatus = changes['engineStatus'].currentValue;
      const previousEngineStatus = changes['engineStatus'].previousValue;
      if (currentEngineStatus === EngineStatus.Drive) {
        const time =
          Math.round(this.car.distance / this.car.velocity / 10) / 100;
        requestAnimationFrame(() => this.animation(time));
      }
      if (previousEngineStatus && currentEngineStatus === EngineStatus.Init) {
        this.carImage.style.left = INDENT_LEFT;
      }
    }
  }

  ngAfterViewInit() {
    const hostElem = this.el.nativeElement;
    this.carImage = hostElem.querySelector('app-car-image');
  }

  onDelete(id: number): void {
    this.store.dispatch(deleteCar({ id }));
  }

  onUpdate() {
    this.isBeingUpdated = true;
  }

  onSaveUpdates($event: CarRequest, id: number): void {
    this.store.dispatch(updateCar({ ...$event, id }));
    this.isBeingUpdated = false;
  }

  onCancel() {
    this.isBeingUpdated = false;
  }

  onStartEngine() {
    this.store.dispatch(startEngineLoading({ id: this.car.id }));
  }

  onStopEngine() {
    this.store.dispatch(stopEngineLoading({ id: this.car.id }));
  }

  animation(time: number) {
    const width = this.carRace.nativeElement.offsetWidth;
    const path = width - INDENT_LEFT_NUMBER - INDENT_RIGHT_NUMBER;
    const endTime = Date.now() + time * 1000;
    this.carImage.style.left = INDENT_LEFT;
    const refreshIntervalId = setInterval(() => {
      const count = path * (1 - (endTime - Date.now()) / time / 1000);
      this.carImage.style.left = ` ${INDENT_LEFT_NUMBER + count}px`;
      if (Date.now() >= endTime) {
        this.carImage.style.left = `calc(100% - ${INDENT_RIGHT})`;
        clearInterval(refreshIntervalId);
      }
      if (this.engineStatus === EngineStatus.Failed) {
        clearInterval(refreshIntervalId);
      }
      if (this.engineStatus === EngineStatus.Init) {
        this.carImage.style.left = INDENT_LEFT;
        clearInterval(refreshIntervalId);
      }
    });
  }
}
