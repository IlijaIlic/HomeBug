import { Component, input, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { UnknownBugModel } from '../../../models/unknown-bug.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unknown-bug-image',
  imports: [NgIcon, CommonModule],
  templateUrl: './unknown-bug-image.html',
  styleUrl: './unknown-bug-image.scss',
})
export class UnknownBugImage {

  @Input() size = 15;
  @Input() country_show = true;
  @Input() bug!: UnknownBugModel;

}
