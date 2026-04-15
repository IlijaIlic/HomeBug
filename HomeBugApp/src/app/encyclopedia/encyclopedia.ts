import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { RouterModule } from '@angular/router';
import { KnownBugService } from '../../services/known-bug-service';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { KnownBugModel } from '../../models/known-bug.model';

@Component({
  selector: 'app-encyclopedia',
  imports: [UnknownBugImage, AppliedFilter, RouterModule, CommonModule],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia implements OnInit {

  constructor(private kBugService: KnownBugService) { }

  width: number = window.innerWidth;
  size_of_comp: number = 10;

  kbugs?: KnownBugModel[];

  ngOnInit(): void {
    if (this.width < 600) {
      this.size_of_comp = 7;
    } else {
      this.size_of_comp = 15
    }

    this.kBugService.getAll().subscribe({
      next: (response) => {
        console.log(response)
        this.kbugs = response
      },
      error: (response) => console.log(response),
    })

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
