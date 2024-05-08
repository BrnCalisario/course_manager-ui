import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [ColorPickerModule, CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {

  @Input({ required: true })
  public color: string = "#2fa296";

  @Output()
  public colorChange = new EventEmitter<string>();
}
