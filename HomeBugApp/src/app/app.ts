import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Landing } from './landing/landing';
import { Header } from './ui-components/header/header';
import { Footer } from './ui-components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Landing, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'HomeBugApp';

}
