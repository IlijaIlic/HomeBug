import { Component } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-encyclopedia',
  imports: [UnknownBugImage, AppliedFilter, RouterModule],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia {

}
