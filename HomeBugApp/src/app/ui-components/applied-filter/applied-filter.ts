import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-applied-filter',
  imports: [],
  templateUrl: './applied-filter.html',
  styleUrl: './applied-filter.scss',
})
export class AppliedFilter {
  @Input() filter_name: String = ""
}
