import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AngularRangeSelectorComponent
} from "../../../../../libs/angular/range-selector/src/lib/angular-range-selector/angular-range-selector.component";

@Component({
  selector: 'angular-range-selector-example',
  standalone: true,
  imports: [CommonModule, AngularRangeSelectorComponent],
  templateUrl: './angular-range-selector-example.component.html',
  styleUrls: ['./angular-range-selector-example.component.scss'],
})
export class AngularRangeSelectorExampleComponent {}
