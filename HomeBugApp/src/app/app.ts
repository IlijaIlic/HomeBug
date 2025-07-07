import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Landing } from './landing/landing';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Landing],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'HomeBugApp';

}
