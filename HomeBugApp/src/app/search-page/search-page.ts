import { Component, HostListener, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { RouterModule } from '@angular/router';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';


@Component({
  selector: 'app-search-page',
  imports: [NgIcon, UnknownBugImage, RouterModule, AppliedFilter],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {

  width: number = window.innerWidth;
  size_of_comp: number = 10;

  ngOnInit(): void {
    if (this.width < 600) {
      this.size_of_comp = 10;
    } else {
      this.size_of_comp = 15
    }


  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    if (this.width < 600) {
      this.size_of_comp = 10;
    } else {
      this.size_of_comp = 15
    }


  }


}
