import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';

@Component({
  selector: 'app-search-page',
  imports: [NgIcon, UnknownBugImage],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {

}
