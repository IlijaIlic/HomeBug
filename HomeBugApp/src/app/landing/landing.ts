import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { KnownBugModel } from '../../models/known-bug.model';
import { RouterModule } from '@angular/router';
import { ScrollAnimateDirective } from '../directives/scroll-animate.directive';

@Component({
  selector: 'app-landing',
  imports: [NgIcon, UnknownBugImage, RouterModule, ScrollAnimateDirective],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',

})
export class Landing {

  isHoveredMagn = false
  isModalOpen = false

  public bug: KnownBugModel = {
    id: 132,
    common_name: "",
    latin_name: "",
    picture_urls: ["uploads/files-1776445436864-268246958.jpg"],
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



}
