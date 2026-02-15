import { Component } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';

@Component({
  selector: 'app-encyclopedia',
  imports: [UnknownBugImage, AppliedFilter],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia {

}
