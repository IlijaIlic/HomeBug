import { Component } from '@angular/core';
import { Comment } from '../ui-components/comment/comment';

@Component({
  selector: 'app-unknown-bug',
  imports: [Comment],
  templateUrl: './unknown-bug.html',
  styleUrl: './unknown-bug.scss',
})
export class UnknownBug {

  countryCode = 'rs';
}
