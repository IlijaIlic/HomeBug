import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [CommonModule],
  templateUrl: './input-field.html',
  styleUrl: './input-field.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputField),
      multi: true
    }
  ]
})
export class InputField implements ControlValueAccessor {
  @Input() label: String = "";
  @Input() placeholder: String = "";
  @Input() type: String = "text";
  @Input() width: String = "11rem";
  @Input() value = "";
  @Output() valueChange = new EventEmitter<string>();
  
  @Input() suggetsions: string[] | null = null

  isDisabled = false;
  private onChange = (_: any) => {};
  private onTouched = () => {};

  onInput(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;
    this.valueChange.emit(newValue);
    this.onChange(newValue);   
  }

  onBlur() {
    this.onTouched();         
  }

  writeValue(val: string): void {
    this.value = val ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}