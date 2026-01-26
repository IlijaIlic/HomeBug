import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-search-page',
  imports: [NgIcon, UnknownBugImage, RouterModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {

}
