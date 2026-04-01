import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss'
})
export class InputField {
  @Input() label: String ="";
  @Input() placeholder: String ="";
  @Input() formControl!: FormControl;
  @Input() type: String = "text";
  @Input() width: String = "11rem";
  @Input() value = "";

  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event){
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.valueChange.emit(newValue)
  }
}