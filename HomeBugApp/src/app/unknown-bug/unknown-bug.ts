import { Component } from '@angular/core';
import { Comment } from '../ui-components/comment/comment';
import { InputComment } from '../ui-components/input-comment/input-comment';

@Component({
  selector: 'app-unknown-bug',
  imports: [Comment, InputComment],
  templateUrl: './unknown-bug.html',
  styleUrl: './unknown-bug.scss',
})
export class UnknownBug {

  countryCode = 'rs';
}
