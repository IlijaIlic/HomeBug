import { Component, input, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UnknownBugModel } from '../../../models/unknown-bug.model';
import { CommonModule } from '@angular/common';
import { KnownBugModel } from '../../../models/known-bug.model';
import countriesData from '../../../data/coords.json'

type CountryData = Record<string, { name: string; code3: string; coordinates: number[] }>;

@Component({
  selector: 'app-unknown-bug-image',
  imports: [NgIcon, CommonModule],
  templateUrl: './unknown-bug-image.html',
  styleUrl: './unknown-bug-image.scss',
})
export class UnknownBugImage implements OnInit {



  @Input() size = 15;
  @Input() country_show = true;
  @Input() unknown = true;
  @Input() bug?: UnknownBugModel;
  @Input() kbug?: KnownBugModel;
  @Input() countryCode?: string = 'rs';

  countryCode3?: string

  ngOnInit(): void {
    if (this.countryCode) {
      this.countryCode3 = (countriesData as CountryData)[this.countryCode].code3;
    }
  }

  public apirul = "http://localhost:3000/"
}
