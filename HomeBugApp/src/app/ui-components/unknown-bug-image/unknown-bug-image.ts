import { Component, input, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-unknown-bug-image',
  imports: [NgIcon],
  templateUrl: './unknown-bug-image.html',
  styleUrl: './unknown-bug-image.scss',
})
export class UnknownBugImage {

  @Input() size = 15;
  @Input() country_show = true;

}
