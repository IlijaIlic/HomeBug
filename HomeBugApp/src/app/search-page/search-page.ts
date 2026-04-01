import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { RouterModule } from '@angular/router';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [UnknownBugImage, RouterModule, AppliedFilter, CommonModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {

  bugs: UnknownBugModel[] = []
  width: number = window.innerWidth;
  size_of_comp: number = 10;

  constructor(private ubugService: UnknownBugService) { }

  ngOnInit(): void {

    this.ubugService.getAll().subscribe({
      next: (data) => {
        this.bugs = data
        console.log(data)
      },
      error: (data) => console.log(`Failed to fetch data ${data}`)
    })

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
