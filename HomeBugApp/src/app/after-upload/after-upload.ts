import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { KnownBugModel } from '../../models/known-bug.model';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-after-upload',
  imports: [UnknownBugImage, RouterLink],
  templateUrl: './after-upload.html',
  styleUrl: './after-upload.scss',
})
export class AfterUpload implements OnInit {
  width: number = window.innerWidth;
  size_of_comp: number = 10;
  selectedFile: File | null = null;

  bug: KnownBugModel = {
    id: -1,
    common_name: "Insect name",
    latin_name: "",
    picture_urls: ["uploads/file-1775754156108-601137211.jpg"],
    taxonomy: {
      id: -1,
      taxonomyClass: "",
      order: "",
      family: "",
      genus: "",
      species: "",
    },
    overview: "",
    regions: [],
    habitats: [],
    behaviour: "",
    body_type: "",
    color: "",
    diet: "",
    no_legs: 0,
    size: "",
    danger_to_humans: false,
    stings: false,
    venomous: false,
    wings: false,
    bites: false,
  };

  constructor(private router: Router) {
    const state = this.router.currentNavigation()?.extras.state
    this.selectedFile = state?.['img']
 
  }

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

  handleNotSati() {
    this.router.navigate(['/search/notfound'], { state: { img: this.selectedFile } })
  }

}
