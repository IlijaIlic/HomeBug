import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-encyclopedia',
  imports: [UnknownBugImage, AppliedFilter, RouterModule],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia implements OnInit {

  width: number = window.innerWidth;
  size_of_comp: number = 10;

  ngOnInit(): void {
    if (this.width < 600) {
      this.size_of_comp = 7;
    } else {
      this.size_of_comp = 15
    }


  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    if (this.width < 600) {
      this.size_of_comp = 7;
    } else {
      this.size_of_comp = 15
    }


  }

}
