import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-applied-filter',
  imports: [],
  templateUrl: './applied-filter.html',
  styleUrl: './applied-filter.scss',
})
export class AppliedFilter {
  @Input() filter_name: string = ""
  @Input() filter_key: string = '';
  @Output() removed = new EventEmitter<{ key: string, value: string }>();

  remove() {
    this.removed.emit({ key: this.filter_key, value: this.filter_name });
  }

}
