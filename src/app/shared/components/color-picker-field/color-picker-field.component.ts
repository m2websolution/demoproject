import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-color-picker-field',
  templateUrl: './color-picker-field.component.html',
  styleUrls: ['./color-picker-field.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ColorPickerFieldComponent {
  @Input() id: any;
  @Input() value: any;

  @Output() handleChange: EventEmitter<any> = new EventEmitter<any>();

  changehandler(event: any) {
    this.handleChange.emit(event);
  }
}
