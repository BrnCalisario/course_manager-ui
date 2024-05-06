import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [ColorPickerModule, CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {

  public color: string = "#FFF";
}
